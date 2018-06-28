# pm2-conf

## 说明
* 我们使用pm2时，当pm2配置instances为0时，pm2源码里将调用require('os').cpus().length获取逻辑cpu个数并设置为该值，
* 但在docker的centos:7容器里，require('os').cpus()的C++源码读取/proc/stat作为cpu信息依据，该值不准确，
* 使用pm2-conf代替pm2命令，会改写为docker容器实际分配的逻辑cpu个数

## 使用方式
```
命令参数与pm2完全相同
```
