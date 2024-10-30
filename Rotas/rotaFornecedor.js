import { Router } from "express"; //micro-aplicação HTTP
import FornecedorCtrl from "../Controle/fornecedorCtrl.js";

const fornecedorCtrl = new FornecedorCtrl();
const rotaFornecedor = Router();

rotaFornecedor.post("/", fornecedorCtrl.gravar);
rotaFornecedor.put("/:codigo", fornecedorCtrl.editar);
rotaFornecedor.patch("/:codigo", fornecedorCtrl.editar);
rotaFornecedor.delete("/:codigo", fornecedorCtrl.excluir);
rotaFornecedor.get("/:codigo",fornecedorCtrl.consultar);
rotaFornecedor.get("/", fornecedorCtrl.consultar);

export default rotaFornecedor;