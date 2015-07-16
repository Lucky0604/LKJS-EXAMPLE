function registerMultiStateAnchorListeners(anchor, anchorImage, path, extension){
	//载入鼠标悬停状态的图像
	//载入过程与其余的脚本
	//异步执行
	var imageMouseOver = new Image();
	imageMouseOver.src = path + '-over' + extension;
	//当鼠标悬停时变换图像的源文件
	Lk.addEvent(anchor, 'mouseover', function(W3CEvent){
		anchorImage.src = imageMouseOver.src;
	});
	//当鼠标移除时将图像变换为原始文件
	Lk.addEvent(anchor, 'mouseout', function(W3CEvent){
		anchorImage.src = path+extension;
	});
	//载入鼠标按下时的图像
	var imageMouseDown = new Image();
	imageMouseDown.src = path + '-down' + extension;
	//当鼠标按下时将图像变换为按下状态的源文件
	Lk.addEvent(anchor, 'mousedown', function(W3CEvent){
		anchorImage.src = imageMouseDown.src;
	});
	//当鼠标放开时将图像变换为原始文件
	Lk.addEvent(anchor, 'mouseup', function(W3CEvent){
		anchorImage.src = path + extension;
	});
}

function initMultiStateAnchors(W3CEvent){
	//查找页面中所有的锚
	var anchors = Lk.getElementsByClassName('multiStateAnchor','a',document);
	//循环遍历列表中的所有锚元素
	for(var i = 0;i<anchors.length;i++){
		//找到锚中的第一个子图像元素
		var anchorImage = anchors[i].getElementsByTagName('img')[0];
		if(anchorImage){
			//如果存在图像元素，解析其源路径
			var extensionIndex = anchorImage.src.lastIndexOf('.');
			var path = anchorImage.src.substr(0, extensionIndex);
			var extension = anchorImage.src.substring(extensionIndex, anchorImage.src.length);

			//添加各种鼠标处理程序
			//同时预先加载图像
			registerMultiStateAnchorListeners(
				anchors[i],
				anchorImage,
				path,
				extension
				);
		}
	}
}
//当文档载入完成时修改具有特定标记的锚
Lk.addEvent(window, 'load', initMultiStateAnchors);













