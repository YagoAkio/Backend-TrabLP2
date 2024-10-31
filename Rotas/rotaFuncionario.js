import { Router } from "express"; //micro-aplicação HTTP
import FuncionarioCtrl from "../Controle/funcionarioCtrl.js";

const funcionarioCtrl = new FuncionarioCtrl();
const rotaFuncionario = Router();

rotaFuncionario.post("/", funcionarioCtrl.gravar);
rotaFuncionario.put("/:codigo", funcionarioCtrl.editar);
rotaFuncionario.patch("/:codigo", funcionarioCtrl.editar);
rotaFuncionario.delete("/:codigo", funcionarioCtrl.excluir);
rotaFuncionario.get("/:codigo",funcionarioCtrl.consultar);
rotaFuncionario.get("/", funcionarioCtrl.consultar);

export default rotaFuncionario;