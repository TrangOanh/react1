import React, { Component } from 'react';

class AddUser2 extends Component {
    constructor(props){
        super(props);
        this.state={
            id:"",
            name:"",
            tel:"",
            Permision:""
        }
    }
    //Ta viết hàm isChanges này rất tiện lợi, và đặt nó vào bất cứ cotrol nào cũng  có thể lấy được value, và name của control đó
    //Như vậy ta sẽ sử dụng hàm này vào tất cả control textbox và select để lấy dữ liệu trả về
    isChanges (event) {
        const name=event.target.name;
        const value=event.target.value;
        //Lấy giá trị của các control và tên của nó đẩy vào biến state, ta chỉ cần làm duy nhất lệnh này, bất chấp có bao nhiêu control nhận dữ liệu đều được
        this.setState({
            [name]:value
        })
        
    }
    //Kiểm tra biến state của Component App, được truyền qua Component AddUser2 thông qua biến props
    kiemTraTrangThai=()=>{
        if(this.props.hienThiForm===true){
            return(
                <form>
                    <div className="phai">
                        <div className='formThemMoi'>
                            <p>Tên</p>
                            <input type="text" placeholder="Nhập tên" onChange={(event)=>this.isChanges(event)} name="name"/>
                            <p>Điện thoại</p>
                            <input type="text" placeholder="Nhập số điện thoại" onChange={(event)=>this.isChanges(event)} name="tel"/>
                            <p>Phân quyền</p>
                            <select onChange={(event)=>this.isChanges(event)} name="Permision">
                                <option value="1">Admin</option>
                                <option value="2">User</option>
                            </select>
                            {/* Dùng type="reset" để nó tự động reset khi nhấn nút này-tuy nhiên phải bọc các ptử thẻ form mới được  */}
                            <input type="reset" className="them" value="Thêm" onClick={()=>this.props.add(this.state.name,this.state.tel,this.state.Permision)}/>
                        </div>
                    </div>
                </form>
            );
        }
    }//Kết thúc hàm kiemTraTrangThai
    render() {
        //console.log(this.state);//hàm in tất cả biến trạng thái
        return(
            //Gọi hàm kiemTraTrangThai tai đây
            this.kiemTraTrangThai()
        )
    }
}
export default AddUser2;