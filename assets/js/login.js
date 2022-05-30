$(function() {
    // 点击去注册账号让 登录框隐藏，注册框显示
    $("#link_reg").click(() => {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    // 点击去登录让 注册框隐藏，登录框显示
    $("#link_login").click(() => {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    // 引入form 模块
    const form = layui.form;

    // 自定义校验规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
            // 校验两次密码是否一致的规则
            repwd: (val) => {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                const pwd = $(".reg-box [name=password]").val();
                if (pwd !== val) return "两次密码不一致"
            },
        })
        // 设置 baseurl
    const layer = layui.layer;
    // const baseurl = `http://www.liulongbin.top:3007`;
    // 注册功能
    $('#form_reg').on('submit', (e) => {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/api/reguser',
                data: {
                    username: $("#form_reg [name=username]").val(),
                    password: $("#form_reg [name=password]").val(),
                },
                success: res => {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg('注册成功');
                    $("#link_login").click();
                }

            })

            $("#form_login").submit(function(e) {
                e.preventDefault();
                $.ajax({
                    type: "POST",
                    url: "/api/login",
                    data: $("#form_login").serialize(),
                    success: (res) => {
                        if (res.status !== 0) return layer.msg(res.message);
                        layer.msg("登录成功！");
                        // 将登录成功得到的 token 字符串，保存到 localStorage 中
                        localStorage.setItem("token", res.token);
                        // 跳转到主页
                        location.href = "/index.html";
                    },
                });
            });
        })
        // 登录功能 
});