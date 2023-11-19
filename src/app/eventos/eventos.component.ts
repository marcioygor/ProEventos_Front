import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos:any=[];
  public eventosFiltrados:any=[];
  widthImg:number=50;
  marginImg:number=2;
  exibirImagem:boolean=true;
  private _filtroLista:string='';
  constructor(private http: HttpClient) { } //é nescessário importar o arquivo app.module

  ngOnInit(): void {
    this.getEventos();
  }

public get filtroLista():string{
  return this._filtroLista;
}

filtrarEventos(filtrarPor:string):any{
  filtrarPor=filtrarPor.toLocaleLowerCase();
  return this.eventos.filter(
    (evento: { tema: string; local:string })=>evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 
    || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1 
  )
}

public set filtroLista(value:string){
   this._filtroLista=value;
   this.eventosFiltrados=this.filtroLista ? this.filtrarEventos(this.filtroLista): this.eventos;
   
}

  alterarImagem(){
    this.exibirImagem=!this.exibirImagem;
  }
  public getEventos():void{
     
    this.http.get("https://localhost:5001/api/eventos").subscribe(
      response=>{
        this.eventos=response;
        this.eventosFiltrados=response;
      },
      error=>console.log(error)
    );

  }
}
