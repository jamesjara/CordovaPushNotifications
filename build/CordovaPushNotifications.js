Ext.define("Ext.ux.CordovaPushNotifications",{alias:"widget.cordovapushnotifications",requires:["Ext.Ajax","Ext.mixin.Observable"],mixins:["Ext.mixin.Observable"],config:{gcmServer:"",userName:"",password:"",userId:"",android:{},ios:{},windows:{}},constructor:function(a){var b=this;b.initConfig(a);this.mixins.observable.constructor.call(this,a);b.cordovaPlugin=window.plugins&&window.PushNotification?window.plugins.PushNotification=window.PushNotification:false;if(!b.cordovaPlugin){console.log("cordovaPlugin not found!");return}push=b.cordovaPlugin.init(b.getConfig());push.on("registration",function(c){b.onRegistration(c)});push.on("notification",b.onNotification,b);push.on("error",b.onError,b)},onRegistration:function(c){var b=this,a=c.registrationId;Ext.Ajax.request({url:b.getGcmServer(),params:{id:b.getUserId(),name:a},method:"POST",withCredentials:false,useDefaultXhrHeader:false,success:function(d){b.fireEvent("registered",this)},headers:{Authorization:"Basic "+btoa(b.getUserName()+":"+b.getPassword())}});b.fireEvent("registration",this)},onNotification:function(b){var a=this;this.fireEvent("notification",this);a.cordovaPlugin.finish(function(){this.fireEvent("finish",a)})},onError:function(a){this.fireEvent("error",this)}});