
/**
 * 将formData格式图片转为base64格式
 * @param {Proxy(Array)} formData - 要解析的图片formData格式文件
 * @returns {string} 解析后文件的base64字符串
 */

export function toBase64(formData) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const file = formData.get('picture'); // 假设文件字段名为 'file'
  
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];//不带前缀
        // const base64String = reader.result;//带前缀
        resolve(base64String);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }