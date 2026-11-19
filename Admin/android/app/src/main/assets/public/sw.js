/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "index.html",
    "revision": "ab8f317e775f5808455be62bce4eabeb"
  }, {
    "url": "icons/icon.svg",
    "revision": "8a6ef74662b60ea81e876c5ad641edcb"
  }, {
    "url": "icons/icon-maskable-512x512.png",
    "revision": "9db514a9f54123eb038c003ae8f85917"
  }, {
    "url": "icons/icon-512x512.png",
    "revision": "08523f07d0732148c4c8d0228e91630a"
  }, {
    "url": "icons/icon-192x192.png",
    "revision": "a3fb34de1f76586bc3882ded6f5d8469"
  }, {
    "url": "assets/web-Cu70UIvk.js",
    "revision": null
  }, {
    "url": "assets/index-Bk_Nmaml.css",
    "revision": null
  }, {
    "url": "assets/index-Bf1fEdAy.js",
    "revision": null
  }, {
    "url": "assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size4-Regular-DWFBv043.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size4-Regular-BF-4gkZK.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size3-Regular-DgpXs0kz.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size3-Regular-CTq5MqoE.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size2-Regular-oD1tc_U0.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size2-Regular-Dy4dx90m.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size2-Regular-B7gKUWhC.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size1-Regular-mCD8mA8B.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size1-Regular-Dbsnue_I.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size1-Regular-C195tn64.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Script-Regular-D5yQViql.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Script-Regular-D3wIWfF6.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Script-Regular-C5JkGWo-.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Italic-DN2j7dab.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-Italic-t53AETM-.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-Italic-flOr_0UB.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-Italic-DA0__PXp.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Regular-ypZvNtVU.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Regular-Dr94JaBh.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Regular-B22Nviop.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Italic-NWA7e6Wa.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Italic-BMLOBm91.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Italic-3WenGoN9.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-BoldItalic-SpSLRI95.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Bold-waoOVXN0.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Bold-Jm3AIy58.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Bold-Cx986IdX.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Regular-CB_wures.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Bold-BsDP51OF.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_AMS-Regular-DRggAlZN.ttf",
    "revision": null
  }, {
    "url": "assets/KaTeX_AMS-Regular-DMm9YOAa.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_AMS-Regular-BQhdFMY1.woff2",
    "revision": null
  }, {
    "url": "icons/icon-192x192.png",
    "revision": "a3fb34de1f76586bc3882ded6f5d8469"
  }, {
    "url": "icons/icon-512x512.png",
    "revision": "08523f07d0732148c4c8d0228e91630a"
  }, {
    "url": "icons/icon-maskable-512x512.png",
    "revision": "9db514a9f54123eb038c003ae8f85917"
  }, {
    "url": "icons/icon.svg",
    "revision": "8a6ef74662b60ea81e876c5ad641edcb"
  }, {
    "url": "manifest.webmanifest",
    "revision": "8128a388e0e80b9091d938fa0b16ff5e"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/api\//]
  }));

}));
