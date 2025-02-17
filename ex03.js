
const login = document.querySelector("#Loginform");
login.addEventListener("submit", (event) =>{
    event.preventDefault();
    const formData = new FormData(login);
    const user = Object.fromEntries(formData);

   if(!user.email || !user.password){
    alert('vui lòng nhập đầy đủ');
    return;
   }
   if(user?.password.length < 8){
     alert('mật khẩu quá ngắn');
   }
    fetch("http://localhost:3000/signin", {
        headers :{
        "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((data) =>{
        if(data){
            if (data && data.accessToken) {
               localStorage.setItem("accessToken" , data.accessToken);
               localStorage.setItem("user", JSON.stringify(data.user));
               location.href = "./index.html"
                      alert('đăng nhập thành công');
            } else {
                alert('đăng nhập thất bại');
                loginform.reset();
                return;
            }
        }
    })
    .catch((erorr) => {
        console.log(erorr);
        
    })

})