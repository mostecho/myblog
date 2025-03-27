<?php
// 连接到MySQL数据库
$conn = new mysqli('localhost', 'bqzmqqvs9', 'di7n5x5z', 'github');
if ($conn->connect_error) {
    die('连接数据库失败: '. $conn->connect_error);
}

// 查询数据库获取更新日志
$sql = "SELECT log_date, log_message FROM github_logs ORDER BY log_date DESC";
$result = $conn->query($sql);

// 输出更新日志
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<p><strong>'. $row['log_date']. '</strong>: '. $row['log_message']. '</p>';
    }
} else {
    echo '没有找到更新日志。';
}

// 关闭数据库连接
$conn->close();
?>