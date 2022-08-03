import React, { Component } from 'react';
import TableDataRow from './TableDataRow';

class TableData extends Component {
    
    delete(id){
        this.props.thucHienXoa(id);
    }
    mappingDataUser=()=>this.props.dataUserProps.map((value,key)=>(
          <TableDataRow userName={value.name} stt={key} tel={value.tel} id={value.id} permision={value.Permision} key={key} editFun2={(user)=>this.props.editFun1(value)} changeEditUserStatus={()=>this.props.changeEditUserStatus()} xoa={(id)=>{this.delete(id)}}></TableDataRow>  
        ))
    render() {
        return (
            <div className="trai">
                <div className="tieude">
                    <p className="cot1">STT</p>
                    <p className="cot2">Tên</p>
                    <p className="cot3">Điện thoại</p>
                    <p className="cot4">Quyền</p>
                    <p className="cot5">Chức năng</p>
                </div>
                {/* Bắt đầu phần dữ liệu  */}
                {this.mappingDataUser()}
            </div>
        );
    }
}

export default TableData;