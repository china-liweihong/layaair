var robotAmount = 90;
var colAmount = 15;
var robotScale = 0.3;
var rowAmount = Math.ceil(robotAmount / colAmount);
var textureWidth;
var textureHeight;

Laya.init(laya.utils.Browser.width, laya.utils.Browser.height, laya.webgl.WebGL);
Laya.stage.bgColor = "black";

laya.utils.Stat.show();

var assets = [];
assets.push( { url:"res/robot/data.bin", type:laya.net.Loader.BUFFER } );
assets.push( { url:"res/robot/texture.png", type:laya.net.Loader.IMAGE } );
Laya.loader.load(assets, laya.utils.Handler.create(this, onAssetsLoaded));

function onAssetsLoaded()
{
	var data = laya.net.Loader.getRes("res/robot/data.bin");
	var img = laya.net.Loader.getRes("res/robot/texture.png");
	var temp = new laya.ani.bone.Templet(data, img);
	
	textureWidth = temp.textureWidth;
	textureHeight = temp.textureHeight;
	
	var horizontalGap = (Laya.stage.width - textureWidth * robotScale) / colAmount;
	var verticalGap = (Laya.stage.height - textureHeight * robotScale) / rowAmount;

	for (var i = 0; i < robotAmount; i++)
	{
		var col = i % colAmount;
		var row = i / colAmount | 0;
		
		var robot = createRobot(temp);
		
		robot.pos(horizontalGap * col, verticalGap * row);
		
		robot.stAnimName("Walk");
		robot.play();
	}
}

function createRobot(templet)
{
	var sk = new laya.ani.bone.Skeleton(templet);
	sk.pivot( -textureWidth, -textureHeight);
	sk.scaleX = sk.scaleY = robotScale;
	
	Laya.stage.addChild(sk);
	
	return sk;
}