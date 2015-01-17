namespace("com.youku.ad.dsp.main");
com.youku.ad.dsp.main.layout = Base.extend({
	mainApp:null,//控制全局页面 派发mainController
	mainController:null,//得到派发的mainController
	menuData:null,//左侧菜单的数据
    constructor:function(){
    	this.initModel();
    	this.mainApp = angular.module('main', [ 'mainController']);
		this.mainController = angular.module('mainController', []);
		this.initEvent();
    },
    init:function(){
    	
    },
    initModel:function(){
    	
    },
    initEvent:function(){
		//控制MainMenuList 左侧的slider menu
		this.mainController.controller('MainMenuList', ['$scope', '$http', '$location',function($scope, $http, $location) {
			$http.get('dsp/data/menu1.json').success(function(data) {
						$scope.menus = data;
					})
			 
			$scope.isLeaf = function(leaf) {
		        return leaf == true;
		    }
		    $scope.isLeafAndNoMenus = function(menu) {
		    	if(menu.leaf == true && menu.menus == undefined){
		    	    return true;
		    	}
		        return false;
		    }
			$scope.onClickMenu = function(menu) {
//				for (var index = 0; index < $scope.menus.length; index++) {
//					if($scope.menus[index].id == menu.id){
//					   $scope.menus[index].isac = true;
//					}else{
//					   $scope.menus[index].isac = false; 
//					}
//				}
				
				if(menu.leaf == true){
				    $scope.$root.$broadcast("onClickMenu", menu);//向全局抛出MainMenuList的onClickMenu事件
				}
				return false;
			};
		}]);
		//控制TabPanelList 中间的Tab区域
		this.mainController.controller('TabPanelList', ['$scope', '$http', function ($scope, $http) {
			$scope.tabs = [{
								"name" : "首页",
								"icon" : "fa fa-apple",
								"id" : -1,
								"leaf":true,
								"active":"active",
								"url" : "dsp/basic/index.html"
							}];
		    $scope.currentTab = $scope.tabs[0].url;
			$scope.indexTab = $scope.currentTab;
		    $scope.$on("onClickMenu", function (event, menu) {//监听MainMenuList的onClickMenu事件
		    	if($.inArray(menu,$scope.tabs)==-1){
		    	   $scope.tabs.push(menu);
		    	}
		    	$scope.onClickTab(menu);
		    	$scope.isActiveTab(menu.url)
			});
			$scope.$on("addNewTab", function (event, menu) {//监听MainMenuList的onClickMenu事件
		    	if($.inArray(menu,$scope.tabs)==-1){
		    	   $scope.tabs.push(menu);
		    	}
		    	$scope.onClickTab(menu);
		    	$scope.isActiveTab(menu.url)
			});
			$scope.onDblClickMenu = function (tab){
				//mainLayout.handleSidebarToggler()
				$('.sidebar-toggler').trigger('click');
			}
			//tab关闭事件
			$scope.onCloseTab = function (tab){
			    if(tab.id != -1){
			    	$scope.tabs.remove(tab);
			    	$scope.onClickTab($scope.tabs[$scope.tabs.length-1])
			    }else{
			        
			    }
			}
		    $scope.onClickTab = function (tab) {
		       $scope.currentTab = tab.url;
		    }
		    $scope.isActiveTab = function(tabUrl) {
		        return tabUrl == $scope.currentTab;
		    }
		    $scope.isActiveTab($scope.tabs[0].url)
		    //判断是否显示close
		    $scope.isHideClose = function(tabUrl) {
		    	var bool =false;
		    	bool = tabUrl != $scope.currentTab;
		    	//如果为首页则hide close
		    	if(tabUrl == $scope.indexTab){
		    	    bool = true;
		    	}
		        return bool;
		    }
		    //判断显示哪一个
		    $scope.showWitchTab = function(tabUrl) {
		    	var bool =false;
		    	bool = tabUrl != $scope.currentTab;
		    	//如果为首页则hide close
		        return bool;
		    }
		}]);
		//控制MainTaskList 头部的task任务区域控制
//		this.mainController.controller('MainTaskList',['$scope', '$http', function ($scope, $http) {
//		    $http.get('dsp/data/task.json').success(function(data) {
//				$scope.tasks = data;
//			})
//		}])
    },
    initUI:function(){}
   
})

var main = new com.youku.ad.dsp.main.layout();