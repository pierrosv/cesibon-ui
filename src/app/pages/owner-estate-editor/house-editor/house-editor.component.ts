import {Component, Input, OnChanges} from '@angular/core';
import {HouseInfo, RoomInfo} from "../../../core/models/cityModel";

@Component({
  selector: 'app-house-editor',
  templateUrl: './house-editor.component.html',
  styleUrls: ['./house-editor.component.css']
})
export class HouseEditorComponent implements OnChanges {
  @Input() house: HouseInfo;
  roomNumbers: number[];

  ngOnChanges() {
    console.log(this.house.rooms);
  }
  changedRooms() {
    this.house.rooms = [];
    this.roomNumbers = Array(this.house.noOfRooms).fill(3).map((x,i)=>i);
    this.roomNumbers.forEach( x=> {
      let newRoom = new RoomInfo();
      newRoom.roomNo = x + 1;
      newRoom.surface = 0;
      this.house.rooms.push(newRoom);
    });
  }
}
