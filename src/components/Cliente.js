import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

//Método de validação do formulário
const schema = yup

    .object({
        nome: yup.string().required("O nome é obrigatório"),
        email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
    })
    .required()


function Cliente() {
    // Utilizando a biblioteca React-hook-form
    // Usar o (Handle errors), precisamos instalar => npm install @hookform/resolvers yup

    const {register, handleSubmit, watch, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    const [usuarios, setUsuarios] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect (() => {
        fetch('http://localhost:3000/usuarios')
        .then((response) => response.json())
        .then((resultado) => {
            setUsuarios(resultado)
        })
      }, [])

    //Função excluir (DELETE) 

    const handleRemove=(id) => {
        setUsuarios(usuarios.filter(usuarios => usuarios.id !== id))
    }

    //Função adicionar (POST)

    function onSubmit(usuarios){
        fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarios),
          
    }).then((response) => response.json())
    }
    
    return(

        <tela className="container">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Dados do Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" {...register("nome", { required: true })} placeholder="Digite seu nome"/>
                            <span>{errors.nome?.message}</span>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" {...register("email")} placeholder="Digite seu email" />
                            <span>{errors.email?.message}</span>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">Salvar</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Salvar
                </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="warning" onClick={handleShow} className="botao_novo">
                Novo Usuário
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr >
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>    
                <tbody>
                    {usuarios?.map((usuarios) =>
                        <tr>
                            <td className="linha_texto">{usuarios.nome}</td>
                            <td className="linha_texto">{usuarios.email}</td>
                            <td className="botao_atualizar_excluir" ><Button variant="success">Atualizar</Button> 
                            <Button variant="danger" onClick={() => handleRemove(usuarios.id)}>Excluir</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>

        </tela>
    )
}

export default Cliente;