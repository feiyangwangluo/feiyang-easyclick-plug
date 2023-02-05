common.SetContext(ui.getContext());
common.SetActivity(ui.getActivity());
//以上两行代码必须全局初始化一次，否则无法运行!!!!!!!!
function main() {
    //监听脚本关闭
    setStopCallback(function () {
        //脚本停止后回收截图资源
        let release=img.release();
        logd("截图资源释放结果 --> {} ",release);
    });

    startEnv();
    if (!isServiceOk()) {
        loge('自动化服务启动失败');
        exit();
    }

    let result = activeSelf(0, 15 * 1000);
    if (!result) {
        loge('启停自动化服务激活失败');
        exit();
    }

    daemonEnv(true);

   let request=img.requestScreenCapture(10000);
   if(request){
       logd("获取截图权限成功");
       sleep(1000);
   }else {
       loge("获取截图权限失败");
       exit();
   }

   while (true){
       let t=time();
       let bitmap=img.screenCaptureBitmap(0,0,0,0);
       logd("bitmap 数据 --> {} 耗时 --> {} ",bitmap,time()-t);
       let recycle=img.recycle(bitmap);
       logd("bitmap 回收 --> {} ",recycle);
   }
   





}




main();
