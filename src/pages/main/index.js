import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
import { Link } from 'react-router-dom';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;
        this.setState({ products: response.data.docs, productInfo, page });
    };

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNmber = page - 1;

        this.loadProducts(pageNmber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNmber = page + 1;

        this.loadProducts(pageNmber); 
    }

    render() {
        return (
            <div className="product-list"> {
                this.state.products.map(product => (
                    <article key={product._id} >
                        <strong > {product.title} </strong>
                        <p> {product.description} </p>

                        <Link to={`/products/${product._id}`}> Acessar </Link>
                    </article>
                ))}
                <div className="actions" >
                    <button onClick={this.prevPage} > Anterior </button>
                    <button onClick={this.nextPage} > Proximo </button>
                </div>
            </div>
        );
    }
}