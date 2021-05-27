import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Administrador } from 'src/app/clases/administrador/administrador';
import { Especialista } from 'src/app/clases/especialista/especialista';
import { Paciente } from 'src/app/clases/paciente/paciente';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  public mostrar:string;
  public listaUsuarios:any[]=[];
  public listaAdministradores:Administrador[]=[];
  public listaEspecialistas:Especialista[]=[];
  public listaPacientes:Paciente[]=[];
  public mostrarSpinner=true;

  constructor(private servicioUsuarios:UsuarioService) { 


    this.servicioUsuarios.TraerTodos().valueChanges().subscribe((data)=>{
      this.listaUsuarios=data;
      this.CargarListas();
    });
    
  }
  
  ngOnInit(): void {
  
  }

  public CargarListas()
  {
    
    this.listaUsuarios.forEach(element => {
        
      switch(element.perfil)
      {
        case 'Administrador':
          this.listaAdministradores.push(element);
          break;
        case 'Especialista':
          if(element.estadoCuenta)
          this.listaEspecialistas.push(element);
          break;
        case 'Paciente':
          this.listaPacientes.push(element);
          break;
      }
    });
    setTimeout(()=>{
      this.mostrarSpinner=false;
      this.mostrar='Administradores';
    },500);
    
    
  }

}