import './../App.css';
import React from 'react';
import Header from './Header';
import Search2 from './Search2';
import AddUser2 from './AddUser2';
import TableData from './TableData';
import { useState,useEffect } from 'react';//import cái này để sử dụng HOOKS
import DataUser from "./Data";
const { v4: uuidv4 } = require('uuid');//Khai báo sử dụng gói tạo id không trùng, nhớ phải khai báo sau phần import, nếu không sẽ bị báo lỗi

function App() {
  //Tạo biến state dùng HOOKS và khởi tạo giá trị biến hienThiForm=false
  const[hienThiForm,setHienThiForm]=useState(false);
  const[data,setData]=useState(DataUser);
  const[tSearch,setTSearch]=useState("");
  const[editUserSatus,setEditUserStatus]=useState(false);//BIến này dùng để quyết định phần form Edit có hiển thị hay không
  const[userEditObject,setUserEditObject]=useState({});//biến này dùng để chứa 1 user cần sửa, kiểu dữ liệu là đối tượng
  var ketqua=[];//biến này chứa kết quả trả về khi tìm kiếm, có ko có, có thể có nhiều kết quả, sử dụng trong hàm search
  //Phần khai báo và xử lý localStrorage, vì dữ liệu phải được sãn sàng trước khi render, nên phải dùng componentWillMount (nếu dùng class component),
  //vì vậy để tượng tự, ta dùng hooks, đó là dùng hàm userEffect
useEffect(()=>{
  if(localStorage.getItem("userData")===null){
    localStorage.setItem("userData",JSON.stringify(DataUser));//Lúc đầu chưa có, ta đẩy DataUser (là từ tâp tin Json) để chạy đì mô, nhưng vì DataUser có kiểu dữ liệu là json, nên muốn đẩy vào localStorage thì ta phải dùng hàm JSON.stringify để chuyển qua dạng Object, thì mới đẩy nó vào localStorage được
  }else{
    var temp=JSON.parse(localStorage.getItem("userData"));
    //gán nó cho biến state data
    setData(temp);  
  }
},[])//Lưu ý, phải có tham số thứ 2 là một mảng rỗng [], nếu không nó sẽ loop vô tận, còn tại sao? haizzz cũng chưa hiểu, vì còn gà với HOOKS quá
  
  //Hàm truyền cho Component Search2 xử lý khi đã lấy được text trong textbox search
  function getTextSearch(textSearch){
    //giá trị tham số "textSearch" sẽ do Component Search2 chuyển vào, và được lưu vào biến state tSearch
    setTSearch(textSearch);
  }

  function doiTrangThai(){
    //Đổi giá trị của biến state bằng phủ định biến state cũ
    setHienThiForm(!hienThiForm);
  }
  //Phần xử lý tìm kiếm
  function search(){
    //Do dữ liệu (dsUser) ta đã import ở trên, và đặt nó thành biến state, nên ta sẽ duyệt biến state này
    data.forEach((tungMuc)=>{
      //Ta duyệt từng mục có trong state data bằng hàm forEach, có đối số là từng mục (từng dòng), tương đương từng phần tử trong mảng DataUser
      if(tungMuc.name.indexOf(tSearch)!==-1){
        //dùng if để kiểm tra trường "name" của mỗi phần tử, dùng indexOf để so sánh chuỗi ở trường "name" và từ khóa tìm kiếm (được lưu trong state), nếu không khớp sẽ
        //trả về -1, nếu khớp sẽ trả về vị trí đầu tiên (trong trường name), vd=5 hoặc 7
        //Lưu ý, nếu từ khóa chứa trong state là khoãng trắng, thì nó sẽ trả về 0
        ketqua.push(tungMuc);//Nếu tìm thấy thì đẩy vào mảng kết quả sử dụng hàm push
      }
      //Sau khi duyệt qua hết dữ liệu state.data, mảng kếtqua sẽ chứa toàn bộ các Item có trường name trùng với từ khóa
      }
    )
  }
  search();
  //Phần thêm mới USER
  function getNewUserData(name, tel, permision){
       //Khai báo một biến kiểu đối tượng, để chứa dữ liệu 
       var item={};//Khai báo biến kiểu đối tượng
       item.id=uuidv4();//Gán từng thuộc tính của đối tượng item vừa tạo, sử dụng gói đã được khai báo ở trên đẻ tạo id không trùng
       item.name=name;
       item.tel=tel;
       item.Permision=permision;
       //Đẩy dữ liệu vừa lấy ở trên vào biến state data (tập tin json)
       //Tạo một biến để chứa dữ liêu data state
       var dStUser=data;
       //Đẩy một item vào biến vừa tào ở trên
        dStUser.push(item);
        ketqua=dStUser;
        //Cập nhật lại biến stateData
        setData(dStUser);
        //ketqua=data;
       //console.log(data);//cho hiển thị đối tượng vừa tạo
       //Sau khi set lại biến state xong thì ta cập nhật dữ liệu cho localStorage
       localStorage.setItem("userData",JSON.stringify(data));
  }
  //Phần xử lý Edit
  function editUser(user){
    //Tham số user của hàm này được truyền về từ ..
    setUserEditObject(user);//cập nhật lại biến state userEditObject, sau đó truyền giá trị này cho component search2, để hiển thị lên form edit
    
  }
  function changeEditUserStatus(){
    setEditUserStatus(!editUserSatus);
  }
  //hàm này mục đích là lấy dữ liệu từ search2 trả về, mà dữ liệu từ search2 trả về nó được lấy từ editUser -- tóm lại mục tiêu là muốn chuyển dữ liệu (chỉnh sửa) từ editUser cho App
  function getUserEditInApp(info){
      //console.log("đã kết nối dược với App"+info.name);
      data.forEach((value,key)=>{
        if(value.id===info.id){
          value.name=info.name;
          value.tel=info.tel;
          value.Permision=info.permision;
        }
      })
      //Sau khi xư lý xong cập nhật, thì ta cập nhật lại dữ liệu trong localStorage
      localStorage.setItem("userData",JSON.stringify(data));
  }
  //Xử lý phần Delete
  function xoaUser(id){
    //Vì đây ta thực hiện bài tập, nên nếu xóa thì nó sẽ dần dần xóa hết, nên ta gán một biến để giữa lại data góc
    var tempData=data;//trong đó data là biến state, và là dữ liệu góc
    tempData=tempData.filter(item=>item.id!=id);
    //Sau khi thực hiện xóa xong ta cập nhật lại biến state
    setData(tempData);
    //console.log(tempData);//Lưu ý, ta chỉ lọc (xóa) trong biến tạm để học thôi, không thực sự xóa
    //Sau khi xóa dữ liệu, nếu ta có phần CSDL thì lúc này ta thực hiện công việc là cập nhật lại dữ liêu, ở đây phần dữ liệu ta dùng là localStorage, nên ta cập nhật lại nó
    localStorage.setItem("userData",JSON.stringify(tempData));
  }
  return (
    
    <div className='container'>
      <Header></Header>
      {/* Chú ý đến việc gán hàm cho thuộc tính, nếu ta nhập vào là truyenketnoi={ketnoi()}, thì nó sẽ chạy luôn hàm này và không cần click vào nút  */}
      {/* Chú ý kế tiếp là biến "truyenketnoi" là biến props nhé  */}
      {/* Chý ý tiếp theo là, trong bài học thì App là một Component được tạo ra từ class, trong khi bài của mình được tạo từ một function, hehehe... giờ mới để ý, vì nó hiển thị mặc định  */}
      <Search2 hienThiNut={()=>doiTrangThai()} hienThiForm={hienThiForm} searchText={(textSearch)=>getTextSearch(textSearch)} search={()=>search()} editUserStatus={editUserSatus} changeEditUserStatus={()=>changeEditUserStatus()} userEditObject={userEditObject} getUserEditInApp={(info)=>getUserEditInApp(info)}></Search2>
      {/* Truyền biến state "hienThiForm"  của hàm App, vào biến "props" cho Component "AddUser2"  */}
      <AddUser2 hienThiForm={hienThiForm} add={(name,tel,permision)=>getNewUserData(name,tel,permision)}></AddUser2>
      {/* Truyền dữ liệu json cho Component con TableData  */}
      <TableData dataUserProps={ketqua} hienThiForm={hienThiForm} editFun1={(user)=>editUser(user)} changeEditUserStatus={()=>changeEditUserStatus()} 
      thucHienXoa={(ids)=>xoaUser(ids)}></TableData>
    </div>
  );
}

export default App;
