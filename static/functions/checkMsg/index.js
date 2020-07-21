const cloud = require('wx-server-sdk');
cloud.init();
exports.main = async (event, context) => {
    console.log(event.txt);
    const { value, txt } = event;
    try {
        //检查 文字内容是否违规
        const result = await cloud.openapi.security.msgSecCheck({
              content: txt
        })

        return result
    } catch (err) {
        // 错误处理
        // err.errCode !== 0
        return err
    }
}
