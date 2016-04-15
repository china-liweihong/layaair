/// <reference path="../../libs/LayaAir.d.ts" />
module ui 
{
    import ProgressBar=laya.ui.ProgressBar;
    import Handler=laya.utils.Handler;

    export class ProgressBarSample
    {
        private  progressBar:ProgressBar;

       constructor()
       {
            Laya.init(550, 400);
            Laya.stage.scaleMode = laya.display.Stage.SCALE_SHOWALL;
            Laya.loader.load(["res/ui/progressBar.png", "res/ui/progressBar$bar.png"], Handler.create(this, this.onLoadComplete));
        }

        private  onLoadComplete():void 
        {
            this.progressBar = new ProgressBar("res/ui/progressBar.png");
            this.progressBar.pos(75, 150);

            this.progressBar.width = 400;

            this.progressBar.sizeGrid = "5,5,5,5";
            this.progressBar.changeHandler = new Handler(this,this.onChange);
            Laya.stage.addChild(this.progressBar);

            Laya.timer.loop(100, this, this.changeValue);
        }

        private  changeValue():void 
        {
            this.progressBar.value += 0.05;

            if (this.progressBar.value == 1)
                this.progressBar.value = 0;
        }

        private  onChange(value:number):void 
        {
            console.log("进度：" + Math.floor(value * 100) + "%");
        }
    }
}
new ui.ProgressBarSample()