(function(){
	
	//Lk库 base
	//Lk命名空间
	if(!window.ADS){window['Lk'] = {}}
	
	//添加isCompatible方法
	function isCompatible(other){
		if(other === false||!Array.prototype.push
			|| !Object.hasOwnProperty
			|| !document.createElement
			|| !document.getElementsByTagName){
				return false;
			}
			return true;
	};
	window['Lk']['isCompatible'] = isCompatible;
	function $(){
		var elements = new Array();
		//查找作为参数提供的所有元素
		for(var i = 0; i<arguments.length; i++){
			var element = arguments[i];
			//如果该参数是一个字符串，那假设他是一个ID
			if(typeof element =='string'){
				element = document.getElementById(element);
			};
			//如果只提供了一个参数，则立即返回这个元素
			if(arguments.length == 1){
				return element;
			}
			//否则，将它添加到数组中
			elements.push(element);
		}
		//返回包含多个被请求元素的数组
		return elements;
	};
	window['Lk']['$'] = $;
	
	//指定参数时，既可以使用代表对象ID的字符串，也可以使用对象的引用方法
	function exampleLibraryMethod(obj){
		if(!(obj = $(obj))) return false;
		//对obj进行一些操作
	}
	window['Lk']['exampleLibraryMethod'] = exampleLibraryMethod;
	
	function addEvent(node, type, listener){
		//使用前面的方法检查兼容性以保证平稳退化
		if(!isCompatible()){
			return false;
		};
		if(!(node = $(node))){
			return false;
		};
		if(node.addEventListener){
			//W3C的方法
			node.addEventListener(type, listener, false);
			return true;
		}else if(node.attachEvent){
			//MSIE的方法
			node['e'+type+listener] = listener;
			node[type+listener] = function(){
				node['e'+type+listener](window.event);
			};
			node.attachEvent('on'+type, node[type+listener]);
			return true;
		}
		//若两种方法都不具备则返回false
		return false;
	};
	window['Lk']['addEvent'] = addEvent;
	
	function removeEvent(node, type, listener){
		if(!(node = $(node))){
			return false;
		}
		if(node.removeEventListener){
			//W3C的方法
			node.removeEventListener(type, listener, false);
			return true;
		}else if(node.detachEvent){
			//MSIE的方法
			node.detachEvent('on'+type, node[type+listener]);
			node[type+listener] = null;
			return true;
		}
		//若两种方法都不具备则返回false
		return false;
	};
	window['Lk']['removeEvent'] = removeEvent;
	
	function getElementsByClassName(className, tag, parent){
		parent = parent||document;
		if(!(parent = $(parent))){
			return false;
		}
		//查找所有匹配标签
		var allTags = (tag == "*"&& parent.all) ? parent.all:parent.getElementsByTagName(tag);
		var matchingElements = new Array();
		
		//创建一个正则表达式，来判断className是否正确
		className = className.replace(/\-/g,"\\-");
		var regex = new RegExp("(^|\\s)"+ className + "(\\s|$)");
		var element;
		//检查每个元素
		for(var i = 0; i<allTags.length; i++){
			element = allTags[i];
			if(regex.test(element.className)){
				matchingElements.push(element);
			}
		}
		//返回任何匹配的元素
		return matchingElements;
	};
	window['Lk']['getElementsByClassName'] = getElementsByClassName;
	
	function toggleDisplay(node, value){
		if(!(node=$(node))){return false};
		if(node.style.display != 'none'){
			node.style.display = 'none';
		}else{
			node.style.display = value||'';
		}
		return true;
	};
	window['Lk']['toggleDisplay'] = toggleDisplay;
	
	//同element.insertAfter()方法
	//调用Lk.insertAfter(Lk.$('example'),domNode)
	//等同Lk.$('example').parentNode.insertBefore(Lk.$('example'),domNode)
	function insertAfter(node, referenceNode){
		if(!(node = $(node))){
			return false;
		}
		if(!(referenceNode = $(referenceNode))){
			return false;
		}
		return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
	};
	window['Lk']['insertAfter'] = insertAfter;
	
	function removeChildren(parent){
		if(!(parent = $(parent))){
			return false;
		}
		//当存在子节点的时候删除该子节点
		while(parent.firstChild){
			parent.firstChild.parentNode.removeChild(parent.firstChild);
		}
		//再返回父元素，以便实现方法连缀
		return parent;
	};
	window['Lk']['removeChildren'] = removeChildren;
	
	function prependChildren(parent, newChild){
		if(!(parent = $(parent))){
			return false;
		}
		if(!(newChild = $(newChild))){
			return false;
		}
		if(parent.firstChild){
			//如果存在一个子节点，则在这个子节点之前插入
			parent.insertBefore(newChild,parent.firstChild);
		}else{
			//如果没有子节点则直接添加
			parent.appendChild(newChild);
		};
		//返回父元素以便实现方法连缀
		return parent;
	};
	window['Lk']['prependChildren'] = prependChildren;
	
	
	
})();



