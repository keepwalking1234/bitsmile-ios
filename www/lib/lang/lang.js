var langArr={0:{name:'english',caption:'English'},1:{name:'chinese',caption:'中文'}};
var defaultLang=1;
var Lang={
        Home:{english:"Home",
            chinese:"主页"
        },
        Account:{english:"Account",
            chinese:"我的慈善帐户"
        },
        Transactions:{english:"Transactions",
            chinese:"捐赠记录"
        },
        AddressBook:{english:"Address Book",
            chinese:"联系人地址"
        },
        About:{english:"About",
            chinese:"关于Bitsmile彼此.爱"
        },
        Address:{english:"Address",
            chinese:"地址"
        },
        Balance:{english:"Balance",
            chinese:"余额"
        },
        SendCoins:{english:"Send Coins",
            chinese:"发送Bitsmile"
        },
        Status:{english:"Status",
            chinese:"状态"
        },
        WalletVer:{english:"Version",
            chinese:"版本"
        },
        Online:{english:"ONLINE",
            chinese:"在线"
        },
        Offline:{english:"OFFLINE",
            chinese:"离线"
        },
        Blocks:{english:"Blocks",
            chinese:"区块"
        },
        MinFee:{english:"Min Fee",
            chinese:"最低手续费"
        },
        TxCount:{english:"Tx count",
            chinese:"交易统计"
        },
        NoTx:{english:"No entries in the transactions list",
        	chinese:"oh，您还没有任何捐赠记录哦^-^,点击右上角小飞机发起捐赠吧"
        },
        TxDate:{english:"date",
            chinese:"日期"
        },
        PleaseWait:{english:"Please wait...",
            chinese:"请稍候..."
        },
        TxDetails:{english:"Tx Details",
            chinese:"交易明细"
        },
        TxConfirmations:{english:"Confirmations",
            chinese:"确认"
        },
        TxSend:{english:"Send",
            chinese:"发送"
        },
        TxReceive:{english:"Receive",
            chinese:"接受"
        },
        TxNew:{english:"New transaction",
            chinese:"新的交易"
        },
        TxAmount:{english:"Amount",
            chinese:"数额"
        },
        ScanQR:{english:"Scan QR code",
            chinese:"扫描二维码"
        },
        PleaseSelect:{english:"Please select",
            chinese:"请选择"
        },
        SendError:{english:"Error sending coins",
            chinese:"发送错误"
        },
        CoinsSent:{english:"Coins sent",
            chinese:"Bitsmile已经发送成功"
        },
        CoinsSentMsg:{english:"Please note that balance will be updated once the transaction is confirmed!",
            chinese:"请注意，交易确认后，余额才会更新哦"
        },
        ABNoEntry:{english:"No entries in the address book",
            chinese:"联系人地址中没有地址"
        },
        AddEntry:{english:"Add new entry",
            chinese:"添加新地址"
        },
        Edit:{english:"Edit",
            chinese:"编辑"
        },
        Delete:{english:"Delete",
            chinese:"删除"
        },
        SendCoins:{english:"Send coins",
            chinese:"发送Bitsmile"
        },
        Name:{english:"Name",
            chinese:"名字"
        },
        SaveContact:{english:"Save contact",
            chinese:"保存为联系人"
        },
        ConfirmDelete:{english:"Are you sure you want to delete this item?",
            chinese:"你确定你要删除这项吗？"
        },
        Sending:{english:"Sending transaction...",
            chinese:"正在发送交易中..."
        },
        ShellCopyright:{english:"Copyright 2015 The BitSmile developers",
            chinese:"版权所有 2015 彼此.爱 万象hackthon@Shanghai"
        },
        WelcomeMsg:{english:"Welcome to BitSmile wallet",
            chinese:"欢迎使用Bitsmile钱包"
        },
        SetPattern:{english:"Please set your pattern code",
            chinese:"请设置您的手势密码"
        },
        EnterPattern:{english:"Please enter your pattern code",
            chinese:"请输入您的手势密码"
        },
        Save:{english:"Save",
            chinese:"保存"
        },
        Options:{english:"Options",
            chinese:"选项"
        },
        Language:{english:"Language",
            chinese:"语言"
        },
        MyAddress:{english:"My Address",
            chinese:"我的地址"
        },
        PrivateKey:{english:"Private Key",
            chinese:"私钥"
        },
        EnterPatternView:{english:"Enter your pattern code to view",
            chinese:"请输入您的手势密码来查看"
        },
        Hide:{english:"Hide",
            chinese:"隐藏"
        },
        insufficientFunds:{english:"Insufficient Funds to send coins with a fee of:",
            chinese:"余额不足，无法发送："
        },
        buttonOK:{english:"OK",
            chinese:"好"
        },
        buttonCancel:{english:"Cancel",
            chinese:"取消"
        },
        ErrorHeader:{english:"Error",
            chinese:"错误"
        },
        ConnError:{english:"Connection Error",
            chinese:"连接错误"
        },
        walletOffline:{english:"wallet is Offline",
            chinese:"钱包离线了"
        },
        Fee:{english:"Fee",
            chinese:"手续费"
        },
        confirmSend:{english:"Please confirm sending this transaction:",
            chinese:"请确认你要发送bitsmile："
        },
        toSend:{english:"To",
            chinese:"到"
        },
        totalSend:{english:"Total",
            chinese:"合计"
        },
        invalidAddress:{english:"Invalid Address",
            chinese:"无效的bitsmile地址"
        },
        walletName:{english:"Bitsmile wallet",
            chinese:"Bitsmile钱包"
        },
        Settings:{english:"Settings",
            chinese:"设置"
        },
        /////////////////v1.04
        BitSmile:{english:"BitSmile",
            chinese:"Bitsmile慈善工具"
        },
        Login:{english:"Login",
            chinese:"登录"
        },
        Username:{english:"Username",
            chinese:"用户名"
        },
        Password:{english:"Password",
            chinese:"密码"
        },
        newPassword: {
            english: "New Password",
            chinese: "新的密码"
        },
        SignIn:{english:"Sign In",
            chinese:"登录"
        },
        NoAccount:{english:"Please Login or",
            chinese:"请选择登陆"
        },
        Register:{english:"Register",
            chinese:"注册"
        },
        ConfirmPW:{english:"Confirm Password",
            chinese:"确认密码"
        },
        RegisterForm: {
            english: "Registration Form",
            chinese: "注册表格"
        },
        RegisterFormRecover:{english:"Password reset",
            chinese: "重置密码"
        },
        phoneForm:{english:"Phone Number Verification",
            chinese:"验证手机号"
        },
        phoneFormRecover: {
            english: "Change password",
            chinese: "修改密码"
        },
        phoneFormChange: {
            english: "Change phone number",
            chinese: "修改手机号码"
        },
        pleaseEnterPhone: {
            english: "Please enter your phone number",
            chinese:"请输入您的手机号"
        },
        pleaseEnterPhoneRecover: {
            english: "Please enter your accounts phone number",
            chinese: "请输入您的手机号"
        },
        pleaseEnterPhoneChange: {
            english: "Please enter your new phone number",
            chinese: "请输入新的手机号码"
        },
        sendSMS:{english:"Send verification code via SMS",
            chinese:"通过短信发送验证码"
        },
        connectError: {
            english: "Unknown error response from server",
            chinese: "服务器错误"
        },
        smsError: {
            english: "An error occured while trying to send SMS, please retry later!",
            chinese: "验证码发送错误，请稍后重试"
        },
        codeEnter: {
            english: "Please enter the verification code you received",
            chinese: "请输入您收到的验证码"
        },
        codeEnter2: {
            english: "The code is 5 digits",
            chinese: "长度为5位"
        },
        codeError: {
            english: "An error occured while trying to send verification code, please retry later!",
            chinese: "发送验证码错误，请稍后重试"
        },
        Verify: {
            english: "Verify",
            chinese: "验证"
        },
        codeIncorrect: {
            english: "Incorrect code",
            chinese: "验证码错误"
        },
        phoneValidated: {
            english: "Phone number validated, please proceed to registration",
            chinese: "手机号已验证，请继续注册"
        },
        phoneValidatedRecover: {
            english: "Phone number validated, please enter your new password",
            chinese: "手机号已经验证，请输入您的密码"
        },
        resendSMS: {
            english: "Resend verification code via SMS",
            chinese: "重新发送验证码"
        },
        enterCode: {
            english: "Enter received verification code",
            chinese: "输入收到的验证码"
        },
        changePhone: {
            english: "Change phone number",
            chinese: "修改手机号码"
        },
        phoneNumber: {
            english: "Phone",
            chinese: "手机"
        },
        regError: {
            english: "Error response from the server, please try again later",
            chinese: "服务器错误，请稍后重试"
        },
        regError1: {
            english: "Regitration error, invalid session data, please restart registration",
            chinese: "注册有误，无效的数据，请重新注册"
        },
        regError2: {
            english: "Regitration error, Username unavailabe, please try another",
            chinese: "用户名不可用，请重新注册"
        },
        regError3: {
            english: "Regitration error, Phone number already registered, please try another",
            chinese: "手机号已存在，请换另一个手机号"
        },
        regError4: {
            english: "Regitration error, SMS sending error, please try again later",
            chinese: "验证码短信发送错误，请稍后重试"
        },
        regError5: {
            english: "Regitration error, hourly SMS limit exceeded, please try again later",
            chinese: "短信发送太频繁，请稍后重试"
        },
        regError6: {
            english: "Password change error, phone number not registered",
            chinese: "密码修改错误，手机号没有注册"
        },
        regError7: {
            english: "You are not logged in, please log in and retry",
            chinese: "您没有登录，请登录后重试"
        },
        regError8: {
            english: "Server database error, please try again later",
            chinese: "数据库错误，请稍后重试"
        },
        regError9: {
            english: "Could not read user data",
            chinese: "不能读取用户数据"
        },
        regError20: {
            english: "Invalid input",
            chinese: "无效的输入"
        },
        regComplete: {
            english: "Registration complete",
            chinese: "注册完成"
        },
        regCompleteRecover: {
            english: "Password reset complete",
            chinese: "密码重置完成"
        },
        regCompleteChange: {
            english: "Phone number changed",
            chinese: "手机号已经修改"
        },
        welcomeMsg: {
            english: "Welcome to BitSmile",
            chinese: "欢迎加入Bitsmile"
        },
        thankYou: {
            english: "Thank you",
            chinese: "谢谢"
        },
        proceedToLogin: {
            english: "Proceed to login",
            chinese: "正在登录"
        },
        proceedToLoginRecover: {
            english: "Go back",
            chinese: "返回"
        },
        invalidLogin: {
            english: "Invalid username or password",
            chinese: "无效的用户名和密码"
        },
        Logout: {
            english: "Logout",
            chinese: "退出"
        },
        forgotPassword: {
            english: "Forgot password?",
            chinese: "忘记密码？"
        },
        RegisterRecover: {
            english: "Reset",
            chinese: "重置密码"
        },
        setAvatar: {
            english: "Change Account Image",
            chinese: "修改用户头像"
        },
        enablePaymentAddress: {
            english: "Enable Payment Address",
            chinese: "生效支付捐赠地址"
        },
        changePhone: {
            english: "Change Phone",
            chinese: "修改手机号码"
        },
        changePassword: {
            english: "Change Password",
            chinese: "修改密码"
        },
        Back: {
            english: "Go back",
            chinese: "返回"
        },
        paymentAddress: {
            english: "Payment address",
            chinese: "支付地址"
        },
        enablePaymentAddressToggle: {
            english: "Enable payment address",
            chinese: "生效您的接受捐赠的地址"
        },
        enablePaymentAddressAddress: {
            english: "BitSmile pay to address",
            chinese: "支付到该接受捐赠的地址"
        },
        walletAddress: {
            english: "Wallet address",
            chinese: "钱包地址"
        },
        Copy: {
            english: "Copy",
            chinese: "复制"
        },
        accountAvatar: {
            english: "Account Image",
            chinese: "账户头像"
        },
        enableaccountAvatarToggle: {
            english: "Enable Avatar",
            chinese: "头像生效"
        },
        imageSelect: {
            english: "Select image",
            chinese: "选择头像"
        },
        Browse: {
            english: "Browse",
            chinese: "浏览"
        },
        imageSelectError: {
            english: "Error selecting image",
            chinese: "选择头像错误"
        },
        imageUploadError: {
            english: "Error uploading image",
            chinese: "上传头像错误"
        },
        searchBitSmile: {
            english: "Search BitSmile",
            chinese: "搜索服务"
        },
        searchButton: {
            english: "Search",
            chinese: "搜索"
        },
        searchAlias: {
            english: "Username",
            chinese: "用户名"
        },
        noResults: {
            english: "No results",
            chinese: "搜索无结果"
        },
        userTitle: {
            english: "Job/Title",
            chinese: "慈善组织/捐赠主题"
        },
        userTitleDefault: {
            english: "BitSmile User",
            chinese: "Bitsmile用户"
        },
        userCard: {
            english: "User Card",
            chinese: "用户名片"
        },
        Close: {
            english: "Close",
            chinese: "关闭"
        },
        Pay: {
            english: "Pay",
            chinese: "付款"
        },
        Address: {
            english: "Address",
            chinese: "地址"
        }
}; 