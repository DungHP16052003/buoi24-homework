
const register = document.querySelector("#Registerform");

register.addEventListener('submit', function(event){
   event.preventDefault();
   const formData = new FormData(register);
   const userinfor = Object.fromEntries(formData);
   console.log(userinfor);
   if(!userinfor.email || !userinfor.password){
    alert('vui lòng nhập đầy đủ');
     return;
   }
   if (userinfor?.password.length < 8) {
    alert("mật khẩu quá ngắn");
    return;
}
   fetch("http://localhost:3000/signup",{
    headers:{
        "Content-Type": "application/json",
    },
    method:"POST",
    body:JSON.stringify(userinfor),
   })
   .then((res) => res.json())
   .then((data) => {
    if(data){
        if (data.accessToken) {
            // Thong bao thanh cong
            // Chuyen sang trang dang nhap
            if (confirm("Dang ky thanh cong, dang nhap ngay?")) {
                location.href = "./login.html";
            }
        } else {
            alert(data);
            registerForm.reset();
            return;
        }
    }
   })
   .catch((error) =>error)
})
