// START Generic functions
export function createElement(type, attributes) {
  if (!type) {
    return null
  }
  var elm = document.createElement(type)
  if (type === 'img') {
    handleImgElm(elm, attributes)
  } else if (attributes && Object.keys(attributes).length > 0) {
    var attrKeys = Object.keys(attributes)
    for (var i = 0; i < attrKeys.length; i++) {
      var attr = attrKeys[i]
      if (attr === 'style') {
        appendStylesToElm(elm, attributes[attr])
      } else if (attr === 'className') {
        appendClassNamesToElm(elm, attributes[attr])
      } else {
        if (attr.indexOf('data-') > -1) {
          elm.setAttribute(attr, attributes[attr])
        } else {
          elm[attr] = attributes[attr]
        }
      }
    }
  }
  return elm
}

function appendClassNamesToElm(elm, classNames) {
  var attrType = typeof classNames
  if (attrType === 'string') {
    elm.classList.add(classNames)
  } else if (Array.isArray(classNames) && classNames.length > 0) {
    for (var j = 0; j < classNames.length; j++) {
      var className =classNames[j]
      elm.classList.add(className)
    }
  }
}

function removeClassNamesFromElm(elm, classNames) {
  var attrType = typeof classNames
  if (attrType === 'string') {
    elm.classList.remove(classNames)
  } else if (Array.isArray(classNames) && classNames.length > 0) {
    for (var j = 0; j < classNames.length; j++) {
      var className =classNames[j]
      elm.classList.remove(className)
    }
  }
}

function appendStylesToElm(elm, styles) {
  if (!elm) {
    return null
  }
  if (styles && Object.keys(styles).length > 0) {
    var stylePropKeys = Object.keys(styles)
    for (var i = 0; i < stylePropKeys.length; i++) {
      var styleAttr = stylePropKeys[i]
      elm.style[styleAttr] = styles[styleAttr]
    }
  }
}

export function generateContent(data) {
  if (!data.type) {
    return null
  }
  var elm = createElement(data.type, data.elmAttrs)
  if (data.elmAttrs && data.elmAttrs.id) {
    var existingElm = document.getElementById(data.elmAttrs.id)
    if (existingElm) {
      existingElm.innerHTML = ''
      elm = existingElm
    }
  }
  if (data.childElms) {
    for (var i = 0; i < data.childElms.length; i++) {
      var childData = data.childElms[i]
      if (childData.onlyAppend) {
        elm.append(childData.content)
      } else {
        var childElm = generateContent(childData)
        elm.append(childElm)
      }
    }
  }
  return elm
}

function handleImgElm(elm, imageAttrs) {
  if (!elm) {
    return null
  }
  var lightUrl = null
  var darkUrl = null
  var src = imageAttrs.src
  var imageObject = imageAttrs.imageObject
  if (imageObject && imageObject.imageURL) {
    lightUrl = imageObject.imageURL
    darkUrl = imageObject.darkURL
    if (lightUrl === darkUrl) {
      darkUrl = darkUrl + '&bgc=0,0,0'
    }
  } else if (src) {
    lightUrl = src
    darkUrl = src
  }
  var isDarkMode = checkForDarkMode()
  src = isDarkMode ? darkUrl : lightUrl
  if (darkUrl) {
    elm.setAttribute('data-darksrc', darkUrl)
  }
  if (lightUrl) {
    elm.setAttribute('data-lightsrc', lightUrl)
  }
  if (src) {
    elm.src = src
  }
  appendClassNamesToElm(elm, 'opacityZero')
  elm.onload = function(e) {
    removeClassNamesFromElm(elm, 'opacityZero')
  }

  if (imageAttrs && Object.keys(imageAttrs).length > 0) {
    var imageAttrKeys = Object.keys(imageAttrs)
    var ignoreAttrs = ['src', 'imageObject']
    for (var i = 0; i < imageAttrKeys.length; i++) {
      var attr = imageAttrKeys[i]
      if (ignoreAttrs.indexOf(attr) === -1) {
        if (attr === 'style') {
          appendStylesToElm(elm, imageAttrs[attr])
        } else if (attr === 'className') {
          appendClassNamesToElm(elm, imageAttrs[attr])
        } else {
          if (attr.indexOf('data-') > -1) {
            elm.setAttribute(attr, imageAttrs[attr])
          } else {
            elm[attr] = imageAttrs[attr]
          }
        }
      }
    }
  }
}

function returnLoader(id) {
  var loaderData = {
    className: 'loader',
    id: id
  }
  var loader = createElement('div', loaderData)
  var spinnerData = {
    className: 'spinner'
  }
  var spinner = createElement('div', spinnerData)
  loader.append(spinner)
  return loader
}

function checkForDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function updateImagesOnModeChange() {
  var allImgs = document.getElementsByTagName('img')
  var isDarkMode = checkForDarkMode()
  if (allImgs && allImgs.length > 0) {
    for (var i = 0; i < allImgs.length; i++) {
      var img = allImgs[i]
      var dataset = img.dataset
      if (isDarkMode) {
        if (dataset.darksrc) {
          appendClassNamesToElm(img, 'opacityZero')
          img.src = dataset.darksrc
        }
      } else {
        if (dataset.lightsrc) {
          appendClassNamesToElm(img, 'opacityZero')
          img.src = dataset.lightsrc
        }
      }
    }
  }
}

window.matchMedia('(prefers-color-scheme: dark)')
  .addListener(function(e) {
    setTimeout(function() {
      updateImagesOnModeChange();
    }, 100)
  })

function fetchData(params) {
  if (!params || !params.url || !params.type) {
    return null
  }
  var url = params.url
  var callback = params.callback
  var apiParams = params.params
  var type = params.type
  const xhttp = new window.XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText)
      if (callback && typeof callback === 'function') {
        callback(response);
      }
    }
  }
  xhttp.open(type, url, true)
  xhttp.send()
}

// END Generic functions
