/**
 * {@link Ext.ux.CordovaPushNotifications CordovaPushNotifications} are used to display a push notifications on top of phonegap cordova
 * @class Ext.ux.CordovaPushNotifications
 * @author James Jara <jamesjara@gmail.com>
 * 
 * The key difference between ActionSheet and {@link Ext.Sheet} is that ActionSheets are docked at the bottom of the
 * screen, and the {@link #defaultType} is set to {@link Ext.Button button}.
 *
 * ## Example
 *
 *     @example preview
 *      Ext.create('Ext.ux.CordovaPushNotifications',{
 *          gcmServer : 'http://www.jamesjara.com/tmp/webtomobile/gcmGoogleServer/public/api/register',
 *          userName: 'jamesjara@gmail.com',
 *          password: 'password',
 *          userId: '1',
 *          android: {
 *             senderID: "684600745042",
 *             icon: "phonegap",
 *             iconColor: "blue"
 *          },
 *          ios: {
 *             alert: "true",
 *             badge: "true",
 *             sound: "true"
 *          },
 *          windows: {}
 *      });
 *
 * As you can see from the code above, you no longer worry about logic to store registration id
 * because will be send it to open source GCM server {@link #defaultType}.
 *
 */
Ext.define('Ext.ux.CordovaPushNotifications', {
    alias: 'widget.cordovapushnotifications',
    requires: [
        'Ext.Ajax',
        'Ext.mixin.Observable'
    ],
    mixins: [
        'Ext.mixin.Observable'
    ],
    config: {
        /**
         * @cfg {String} gcmServer
         * Server to store the Cloud Messaging registration id.
         * @accessor
         */
        gcmServer: '',
        /**
         * @cfg {String} userName
         * Username to login into the Cloud Messaging Server.
         * @accessor
         */
        userName: '',
        /**
         * @cfg {String} password
         * Password to login into the Cloud Messaging Server.
         * @accessor
         */
        password: '',
        /**
         * @cfg {String} userId
         * User id to create a relation between registrationId and
         * client id in  Cloud Messaging Server.
         * @accessor
         */
        userId: '',
        /**
         * @cfg {Object}
         * Pushnotification plugin configuration
         * see the {@link #https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/API.md}
         * @accessor
         */
        android: {},
        /**
         * @cfg {Object}
         * Pushnotification plugin configuration
         * see the {@link #https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/API.md}
         * @accessor
         */
        ios: {},
        /**
         * @cfg {Object}
         * Pushnotification plugin configuration
         * see the {@link #https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/API.md}
         * @accessor
         */
        windows: {}
    },
    /**
     * @event registration
     * The event registration will be triggered on each successful registration with the 3rd party push service.
     * @param {Object} data data.registrationId The registration ID provided by the 3rd party remote push service.
     */
    /**
     * @event registered
     * The event registration will be triggered on each successful storing of the registration id inthe GCM server.
     */
    /**
     * @event notification
     * The event notification will be triggered each time a push notification is received by a 3rd party push service on the device.
     * @param {Object} data contains message,title,count,sound,image,additionalData,foreground,coldstart
     */
    /**
     * @event error
     * The event error will trigger when an internal error occurs and the cache is aborted.
     * @param {Error} e Standard JavaScript error object that describes the error
     */
    /**
     * @private
     */
    constructor: function(config) {
        var me = this;
        me.initConfig(config);
        this.mixins.observable.constructor.call(this, config);
        me.cordovaPlugin = window.plugins && window.PushNotification ? window.plugins.PushNotification = window.PushNotification : false;
        if (!me.cordovaPlugin) {
            // TODO maybe Support WC3 Notifications http://www.w3.org/TR/notifications/
            console.log("cordovaPlugin not found!");
            return;
        }
        push = me.cordovaPlugin.init(me.getConfig());
        push.on('registration', function(data) {
            me.onRegistration(data);
        });
        push.on('notification', me.onNotification, me);
        push.on('error', me.onError, me);
    },
    /**
     * Will be executed  on each successful registration with the 3rd party push service, and will
     * send the registration id to the GCM server.
     * 
     * @private
     *
     * @param data
     */
    onRegistration: function(data) {
        var me = this,
            rid = data.registrationId;
        Ext.Ajax.request({
            url: me.getGcmServer(),
            params: {
                id: me.getUserId(),
                name: rid
            },
            method: 'POST',
            withCredentials: false,
            useDefaultXhrHeader: false,
            success: function(response) {
                me.fireEvent('registered', this);
            },
            headers: {
                "Authorization": "Basic " + btoa(me.getUserName() + ':' + me.getPassword())
            }
        });
        me.fireEvent('registration', this);
    },
    /**
     * Will be executed each  push notification is received 
     * @private
     *
     * @param data
     */
    onNotification: function(data) {
        var me = this;
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData    
        this.fireEvent('notification', this);
        // Works only for IOS
        me.cordovaPlugin.finish(function() {
            this.fireEvent('finish', me);
        });
    },
    /**
     * This is called when an internal error occurs and the cache is aborted.
     * @private
     *
     * @param e
     */
    onError: function(e) {
        this.fireEvent('error', this);
    }
});

