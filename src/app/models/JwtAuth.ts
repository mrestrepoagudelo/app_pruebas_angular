export class JwtAuth{
    public token:string;
    public userName:string;
    public permisos: {};

    constructor(toke:string,userName:string, permisos:{}){
        this.token = toke;
        this.userName = userName;
        this.permisos = permisos;
    }
}
