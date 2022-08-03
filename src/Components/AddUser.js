import React, { Component, useReducer } from 'react';

class AddUser extends Component {
    constructor(props){
        super(props);
        this.state={
            // biến state này dùng để chỉ trạng thái cần thêm user, nếu true thì muốn thêm user (và se cho hiển thị form thêm), ngược lại thì chỉ cho hiển thị nút "Thêm mới" 
            trangThaiChinhSua:false,
        }
    }
    thayDoiTrangThai(){
        this.setState({
            trangThaiChinhSua:! this.state.trangThaiChinhSua
        });
    }
    hienThiNut(){
        if(this.state.trangThaiChinhSua===true){
            //Cách khái báo sự kiện onClick kiểu này thì khi click vào nút thì nó mới chạy, còn khai báo kiêu onClick={this.thayDoiTrangThai()} thì không cần click nó sẽ chạy luôn ????
            return <input type="button" defaultValue="Đóng lại" className="themtren" onClick={()=>this.thayDoiTrangThai()}/>;
        }else{
            return <input type="button" defaultValue="Thêm mới" className="themtren" onClick={()=>this.thayDoiTrangThai()}/>;
        }
    }
    hienThiFomr(){
        if(this.state.trangThaiChinhSua===true){
            return(
                <div className='formThemMoi'>
                    <p>Tên</p>
                    <input type="text" placeholder="Nhập tên" />
                    <p>Điện thoại</p>
                    <input type="text" placeholder="Nhập số điện thoại" />
                    <p>Phân quyền</p>
                    <select>
                        <option>Admin</option>
                        <option>User</option>
                    </select>
                    <input type="button" defaultValue="Thêm" className="them" />
                </div>
            )
        }
    }
    render() {
        return (
            <div className="phai">
                <div className="tieude">
                    {/* Nơi để 2 nút "Thêm mmới" và "Đóng lại" - tùy vào trạng thái mà hiển thị một trong 2 nút này  */}
                    {/* hàm này thực hiện hiển thị 2 nút trên tùy vào trạng thái, và nó được đặt ở đây, theo đúng thiết kế cúa HTML và CSS */}
                    {this.hienThiNut()}
                </div>
                {/* Nơi để form thêm nút ở đây - đúng với thiết kế HTML - CSS  */}
                {/* Đặt hàm hiển thị form đúng ngay vị trí thiết kế HTML và CSS  */}
                {this.hienThiFomr()}
            </div>

        );
    }
}

export default AddUser;