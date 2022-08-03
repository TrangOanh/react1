import React, { Component } from 'react';
import EditUser from './EditUser';

class Search2 extends Component {
    constructor(props){
        super(props);
        this.state={
            tempValue:"",
            userObj:{}// tạo biến state kiểu đối tượng dụng để chứa dữ liệu đã sửa về cho search2
        }
    }
    //Hàm dùng để lấy thông tin user cần edit-sau khi lấy xong thì nó sẽ tiếp tục gửi lên cho App
    getUserEditInfo(info){
        this.setState({
            userObj:info 
        });
        //console.log(info);
        this.props.getUserEditInApp(info);
    }
    //Hàm lấy giá trị của hop text box trong phần tìm kiếm khi người dùng nhập vào
    isChang=(event)=>{
        //console.log(event.target.value); test dữ liệu lấy về khi gỏ vào ô textbox
        //Lấy giá trị user gỏ vào text bóx gán cho biến state temValue
        this.setState({
            tempValue:event.target.value,
        })
        //Hiên luôn kết quả khi đang gõ vào ô tìm
        this.props.searchText(this.state.tempValue);
        this.props.search();
    }
    hienThiFormEdit(){
        if(this.props.editUserStatus===true){
            return(
                <EditUser changeEditUserStatus={()=>this.props.changeEditUserStatus()} userEditObject={this.props.userEditObject} getUserEditInfo={(info)=>this.getUserEditInfo(info)}></EditUser>
            )
        }
    }
    hienNut(){
        if(this.props.hienThiForm===true){
            return (<input type="button" defaultValue="Đóng lại" className="themtren" onClick={()=>this.props.hienThiNut()}/>);
        }else{
            return (<input type="button" defaultValue="Thêm mới" className="themtren" onClick={()=>this.props.hienThiNut()}/>);
        }
    }
    render() {
        return (
            <div className="tim">
                {this.hienThiFormEdit()}
                <input className="otim" type="text" placeholder="Nhập từ khóa" onChange={(event)=>this.isChang(event)}/>
                <input className="nuttim" type="button" defaultValue="Tìm kiếm" onClick={()=>this.props.searchText(this.state.tempValue)}/>
                <hr />
                <div className="tieude">
                    {this.hienNut()}
                </div>
            </div>
        );
    }
}
export default Search2;