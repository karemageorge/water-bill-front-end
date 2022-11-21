import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { map } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';

// interface RolesNode{
//   text:string;
//   id:string;
//   cls:string;
// }

// interface RolesFlatNode {
//   expandable : boolean;
//   text : string;
//   level : number;
// }

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  // TREE_DATA : RolesNode[]
  // dataSource = new MatTreeNestedDataSource<RolesNode>();
  // treeControl = new FlatTreeControl<RolesFlatNode>(node => node.level, node=> node.expandable); 
  // treeFlattener = new MatTreeFlattener(
  //   (node : RolesNode, level : number): RolesFlatNode =>{
  //     return {
  //       text : node.text,
  //       expandable : node.cls == 'folder',
  //       level
  //     }
  //   } ,
  //   node => node.level,
  //   node => node.expandable,

  // );

  id: any
  treeItems : any[] = []
  loading = false


  constructor(private router : Router, private dialog : MatDialog, private http : HttpClient, private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')
    console.log("id is -----------", this.id)
    this.http.post(environment.base_url+'/user/fetchAssignedRoles.action?userId='+this.id+'&node=xnode-894', {} ,{
      headers : new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded'
      })
  } ).subscribe(
        (resData: any) => {
          
            
            // this.dataSource.data = resData
            for (let data of resData){
              if (data.cls == "folder"){
                data['expandable']= true
              }
            }
            console.log("resdata for roles is ----------", resData)
            
            
          
        } 
        )
  }

  // hasNestedChild(index: string, node : RolesNode ){
  //   return node?.expandable
  // }

  // private loadTree(nodeId: string | undefined = undefined){
  //   this.loading = true
  //   return this.loadNodes(nodeId).pipe(
  //     map(response => response.map( (item: any) => {
  //       return {label : item.name, leaf: item.type === 'V', ...item}
  //     }
       
  //     )),
  //   )
  // }

  loadNodes(nodeId: string | undefined){
    if (!nodeId){
      nodeId = 'ALL';
    }
    return this.http.post(environment.base_url+'/user/fetchAssignedRoles.action?userId=',{})
  }
}
