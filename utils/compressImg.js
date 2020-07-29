/*
 * @Author: zhanghan
 * @Date: 2020-07-29 11:06:28
 * @LastEditors: zhanghan
 * @LastEditTime: 2020-07-29 14:28:20
 * @Descripttion: 图片压缩工具函数
 */

/**
 * base64图片压缩
 * @param {base64} base64String 
 * @param {宽度} w 
 * @param {文件质量（0~1）} quality 
 */
function compressImg(base64String, w, quality) {
  var getMimeType = function (urlData) {
    var arr = urlData.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    // return mime.replace("image/", "");
    return mime;
  };
  var newImage = new Image();
  var imgWidth, imgHeight;

  var promise = new Promise(function (resolve) {
    newImage.onload = resolve
  });
  newImage.src = base64String;
  return promise.then(function () {
    imgWidth = newImage.width;
    imgHeight = newImage.height;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w;
        canvas.height = w * imgHeight / imgWidth;
      } else {
        canvas.height = w;
        canvas.width = w * imgWidth / imgHeight;
      }
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
    var base64 = canvas.toDataURL(getMimeType(base64String), quality);
    console.log(base64);
    return base64;
  });
}

// Base64 to Blob
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}

// Blob to Base64
function blobToDataURL(file) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.onerror = function (error) {
      reject(error)
    }
  })
}

// 获取base64图片大小
function showSize(base64url) {
  //获取base64图片大小，返回KB数字
  var str = base64url.replace('data:image/png;base64,', '');
  var equalIndex = str.indexOf('=');
  if (str.indexOf('=') > 0) {
    str = str.substring(0, equalIndex);
  }
  var strLength = str.length;
  var fileLength = parseInt(strLength - (strLength / 8) * 2);
  // 由字节转换为KB
  var size = "";
  size = (fileLength / 1024).toFixed(2);
  var sizeStr = size + ""; //转成字符串
  var index = sizeStr.indexOf("."); //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
  if (dou == "00") { //判断后两位是否为00，如果是则删除00                
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return parseInt(size);
}
