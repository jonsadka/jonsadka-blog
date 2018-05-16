---
path: "/blog/how-to-debug-a-chrome-specific-bug-on-ios-using-remote-debugging"
date: "1526454000000"
published: true
tags: ["JavaScript"]
title: "How to debug an issue in Chrome for iOS using remote debugging"
---

I recently had the opportunity to implement some new visualizations for [Uber City Guides](https://www.uber.com/local/us+ca+san_francisco/). Before launch, we discovered a strange bug that only occurred on Chrome for iOS. Even though there are some helpful guides online on how to debug Chrome specific bugs on iOS (like [this](https://stackoverflow.com/questions/38179396/is-there-any-way-to-debug-chrome-in-any-ios-device)) I couldn't find a comprehensive guide from start to finish, so I decided to create one.

### Installation and Setup

1. Install RemoteDebug iOS WebKit Adapter on your OSX computer (Mac)
    - This requires you to first install two dependencies using `brew` ([libimobiledevice](https://github.com/libimobiledevice/libimobiledevice) and [iOS WebKit Debug Proxy](https://github.com/google/ios-webkit-debug-proxy))
      ```
      $ brew update
      $ brew unlink libimobiledevice ios-webkit-debug-proxy
      $ brew uninstall --force libimobiledevice ios-webkit-debug-proxy
      $ brew install --HEAD libimobiledevice
      $ brew install --HEAD ios-webkit-debug-proxy
      ```
    - Then install [RemoteDebug iOS WebKit Adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter) globally:
      ```
      $ npm install remotedebug-ios-webkit-adapter -g
      ```

2. Enable the Web Inspector on your iOS device (iPhone or iPad)
    - Choose Settings > Safari > Advanced
    - Toggle "Web Inspector" on

3. Enable the Develop Menu in Safari on your OSX computer ([official link](https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/Web_Inspector_Tutorial/EnableWebInspector/EnableWebInspector.html))
    - Choose Safari > Preferences, and click Advanced
    - At the bottom of the pane, select the "Show Develop menu in menu bar" checkbox.

    ![Safari Preferences Menu](/img/blog-posts/2018-16-05-how-to-debug/1.png "Safari Preferences Menu")
    ![Safari Advanced Settings](/img/blog-posts/2018-16-05-how-to-debug/2.png "Safari Advanced Settings")

4. Allow your OSX computer to access your iOS device
    - Connect your iOS device to your OSX computer using your USB cable
    - Open Safari on OSX
    - Develop > Hover over your iOS device
    - Click "Use for Development..."
    - On your iOS device, click "Trust" when you see the "Trust this Computer?" prompt

    ![Safari Trust Computer](/img/blog-posts/2018-16-05-how-to-debug/3.png "Safari Trust Computer")

5. Setup device discovery in Chrome on OSX
    - Open Chrome on your OSX computer and navigate to `chrome://inspect/#devices`
    - Select the "Discover network targets" checkbox and click the "Configure" button
    - Add "localhost:9000" to the list of hosts
    - Click "Done"

    ![Chrome Inspect Devices](/img/blog-posts/2018-16-05-how-to-debug/4.png "Chrome Inspect Devices")
    ![Chrome Inspect Devices](/img/blog-posts/2018-16-05-how-to-debug/5.png "Chrome Inspect Devices")

### Debugging

1. [Optional if developing locally] Identify local server address
    - Run your server locally on your OSX computer
    - Identify the port your webpage is being served from (typically `http://localhost:<port>`)
    - Open System Preferences on OSX
    - Click "Sharing" and identify the computer name (typically `<computername>.local`)

    ![OSX System Preferences](/img/blog-posts/2018-16-05-how-to-debug/6.png "OSX System Preferences")
    ![OSX Sharing Settings](/img/blog-posts/2018-16-05-how-to-debug/7.png "OSX Sharing Settings")

2. Load the webpage on your iOS device
    - Make sure your iOS device is connected to your OSX computer using your USB cable
    - On your iOS device, open Safari and navigate to the page you are trying to debug (i.e. `<websitename>.com` or, for local development, `http://<computername>.local:<port>`)
    - **NOTE:** Even though we are loading up in Safari on our iOS device, remote debugging using Chrome on our OSX computer will use Chrome's context and user agent instead of Safari's)

3. Run the remote debugger on your OSX computer
      ```
      $ remotedebug_ios_webkit_adapter --port=9000
      ```

4. Debug using Chrome
    - Open Chrome on your OSX computer and navigate to `chrome://inspect/#devices`
    - Identify the webpage you wish to debug on the iOS device and click "Inspect"
    - A Chrome debugger will appear which uses Chrome's context and user agent string instead of Safari's

    ![Chrome Remote Target List](/img/blog-posts/2018-16-05-how-to-debug/8.png "Chrome Remote Target List")
    ![Remote Chrome debugger](/img/blog-posts/2018-16-05-how-to-debug/9.png "Remote Chrome debugger")
