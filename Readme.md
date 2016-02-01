# Ext.ux.CordovaPushNotifications

Ext.ux.CordovaPushNotifications provides simple usage of pushnotifications plugin for cordova and phonegap

## Usage
Load Sencha package:

```javascript
sencha package add CordovaPushNotifications
```

Now, you are ready to use it in your code as follows:

```javascript
       Ext.create('Ext.ux.CordovaPushNotifications',{
           gcmServer : 'http://www.jamesjara.com/tmp/webtomobile/gcmGoogleServer/public/api/register',
           userName: 'jamesjara@gmail.com',
           password: 'password',
           userId: '1',
           android: {
              senderID: "684600745042",
              icon: "phonegap",
              iconColor: "blue"
           },
           ios: {
              alert: "true",
              badge: "true",
              sound: "true"
           },
           windows: {},          
            listeners: {
                'registration': function() {
                    console.log(" registration listener");
                },
                'registered': function() {
                    console.log(" registered  with gcm server ");
                },
                'notification': function(data) {
                    console.log(" notification listener");
                },
                'error': function(error) {
                    console.log("error contact administrator" + error.message);
                }
            }
       });
```

## Documentation
You can build the documentation (like ExtJS Docs) with [**jsduck**](https://github.com/senchalabs/jsduck):

```bash
$ jsduck . --output /var/www/docs
```

It will make the documentation into docs dir and it will be visible at: http://localhost/docs

## License
The MIT License (MIT)

Copyright (c) 2016 James Jara <jamesjara@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.