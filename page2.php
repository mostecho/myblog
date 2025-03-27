<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub 更新日志</title>
    <link rel="stylesheet" href="./CSS样式/daohang.css">
    <link rel="stylesheet" href="./JS样式/daohang.js">
    <style>
        h1 {
            color: #333;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }

        .log-date {
            font-weight: bold;
            color: #666;
        }
    </style>
</head>

<body>
    <ul id="nav">
        <li class="slide1"></li>
        <li class="slide2"></li>
        <li><a href="./index.html">首页</a></li>
        <li><a href="./page1.html">评论区</a></li>
        <li><a href="page2.php">开发日志</a></li>
        <li><a href="#">Q&A</a></li>
        <li><a href="#">赞助</a></li>
    </ul>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <h1>GitHub 更新日志</h1>
    <?php
    // 数据库连接信息
    $servername = "localhost";
    $username = "bqzmqqvs9";
    $password = "di7n5x5z";
    $dbname = "github";

    // 创建数据库连接
    $conn = new mysqli($servername, $username, $password, $dbname);

    // 检查连接是否成功
    if ($conn->connect_error) {
        die("数据库连接失败: ". $conn->connect_error);
    }

    // 查询更新日志
    $sql = "SELECT log_date, log_message FROM github_logs ORDER BY log_date DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<ul>";
        while ($row = $result->fetch_assoc()) {
            $logDate = $row["log_date"];
            $logMessage = $row["log_message"];
            echo "<li>";
            echo "<span class='log-date'>". $logDate. "</span>: ". $logMessage;
            echo "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>暂无更新日志。</p>";
    }

    // 关闭数据库连接
    $conn->close();
    ?>
</body>

</html>    