import React, { Component } from 'react';

class EditUser extends Component {
    constructor(props){
        super(props);
        this.state={
            //Biến state này sẽ ghi lại những giá trị chuẩn bị sửa - được truyền từ App
            id:this.props.userEditObject.id,
            name:this.props.userEditObject.name,
            tel:this.props.userEditObject.tel,
            permision:this.props.userEditObject.Permision,
        }
    }
    //tạo hàm khi click vào nút "Lưu" thì nó sẽ lấy những thông tin cần sửa đưa vao biến state
    isChange(event){
        const   name=event.target.name;
        const   value=event.target.value;
        //Thiết lập giá trị sau khi thay đổi, ta set lại biến trạng thái
        this.setState({
            [name]:value
        });
        //console.log(this.state);
    }
    clickLuu(){
        //Tạo đối tượng infor trước khi gửi dữ liệu cần cập nhật, thông qua hàm hàm search2 đã thông qua biến prop
        var info={};//khai báo biến info là kiểu biến đối tượng, và định nghĩa đối tượng nay qua các lệnh phía dưới tiếp theo
        info.id=this.state.id;
        info.name=this.state.name;
        info.tel=this.state.tel;
        info.permision=this.state.permision;
        this.props.getUserEditInfo(info);//sau khi đã có biến info ở trên rồi, giờ ta dùng hàm đã được gửi tới và tuyền tham số cho search2
        this.props.changeEditUserStatus();
    }
    render() {
        return (
            <div className="sua">
                <p className="tieude">sửa thông tin user</p>
                <p>Tên</p>
                <input type="text" placeholder="Nhập tên" defaultValue={this.props.userEditObject.name} onChange={(event)=>this.isChange(event)} name="name"/>
                <p>Điện thoại</p>
                <input type="text" placeholder="Nhập số điện thoại" defaultValue={this.props.userEditObject.tel} onChange={(event)=>this.isChange(event)} name="tel"/>
                <p>Phân quyền</p>
                <select defaultValue={this.props.userEditObject.Permision} onChange={(event)=>this.isChange(event)} name="permision">
                    <option value="1">Admin</option>
                    <option value="2">Moderator</option>
                    <option value="3">User</option>
                </select>
                <input type="button" defaultValue="Lưu" className="them" onClick={()=>this.clickLuu()}/>
            </div>
        );
    }
}

export default EditUser;