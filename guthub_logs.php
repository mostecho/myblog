<?php
// GitHub API端点，获取仓库的commit日志
$apiUrl = 'https://api.github.com/repos/mostecho/mostecho.github.io/commits';

// 替换为你的GitHub个人访问令牌，若仓库是公开的且不需要更高权限，可不使用令牌
$token = ''; 

// 设置请求头，包含授权信息（如果使用令牌）
$headers = array();
if (!empty($token)) {
    $headers[] = 'Authorization: Bearer '. $token;
}
$headers[] = 'Accept: application/vnd.github.v3+json';

// 发起HTTP请求获取GitHub更新日志
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// 解析JSON响应
$commits = json_decode($response, true);

// 连接到MySQL数据库
$conn = new mysqli('localhost', 'bqzmqqvs9', 'di7n5x5z', 'github');
if ($conn->connect_error) {
    die('连接数据库失败: '. $conn->connect_error);
}

// 遍历GitHub更新日志并插入到数据库
foreach ($commits as $commit) {
    $logDate = date('Y-m-d', strtotime($commit['commit']['author']['date']));
    $logMessage = $commit['commit']['message'];

    // 使用预处理语句防止SQL注入
    $stmt = $conn->prepare("INSERT INTO github_logs (log_date, log_message) VALUES (?,?)");
    $stmt->bind_param("ss", $logDate, $logMessage);
    if (!$stmt->execute()) {
        echo '插入数据失败: '. $conn->error;
    }
    $stmt->close();
}

// 关闭数据库连接
$conn->close();

echo '更新日志同步成功！';
?>