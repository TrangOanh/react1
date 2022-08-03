import React, { Component } from 'react';

class TableDataRow extends Component {
    quyen=()=>{
        if(this.props.permision==1){
            return "Admin";
        }
        else if (this.props.permision==2){
            return "Moderator";
        }else{
            return "Normal User";
        }
    }
    editClick=()=>{
        this.props.editFun2();
        this.props.changeEditUserStatus();
    }
    deleteButton(idUser){
        this.props.xoa(idUser);
    }
    render() {
        return (
            <div className="dulieu">
                <div className="cot1">{this.props.stt+1}</div>
                <div className="cot2">{this.props.userName}</div>
                <div className="cot3">{this.props.tel}</div>
                <div className="cot4">{this.quyen()}</div>
                <div className="cot5">
                <input type="button" defaultValue="Sửa" onClick={()=>this.editClick()}/>
                <input type="button" defaultValue="Xóa" onClick={(id)=>this.deleteButton(this.props.id)}/>
                </div>
            </div>
        );
    }
}

export default TableDataRow;