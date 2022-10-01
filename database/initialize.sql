SET GLOBAL time_zone="Asia/Seoul";
SET time_zone="Asia/Seoul";

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE DATABASE IF NOT EXISTS stdte_task_local CHARACTER SET utf8 COLLATE utf8_unicode_ci;
CREATE DATABASE IF NOT EXISTS stdte_task_test CHARACTER SET utf8 COLLATE utf8_unicode_ci;
CREATE DATABASE IF NOT EXISTS stdte_task_develop CHARACTER SET utf8 COLLATE utf8_unicode_ci;
CREATE DATABASE IF NOT EXISTS stdte_task_staging CHARACTER SET utf8 COLLATE utf8_unicode_ci;
CREATE DATABASE IF NOT EXISTS stdte_task_product CHARACTER SET utf8 COLLATE utf8_unicode_ci;
