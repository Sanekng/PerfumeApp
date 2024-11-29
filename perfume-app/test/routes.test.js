const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../backend/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('API Routes Testing', function () {
    let testIds = {};
    // Perfume Routes
    it('should create a new seller', async function () {
        const response = await chai.request(app)
            .post('/api/sellers')
            .send({
                name: 'John',
                surname: 'Doe',
                phone: '1234567890',
                email: 'john.doe@example.com',
            });
        expect(response.status).to.equal(201);
        expect(response.body.success).to.be.true;
        testIds.seller = response.body.data._id;
    });

    it('should create a new perfume', async function () {
        const response = await chai.request(app)
            .post('/api/perfumes')
            .send({
                name: 'Test Perfume',
                price: 100,
                description: 'A sample perfume',
                image: 'image_url',
                quantity: 10,
                seller: testIds.seller, // Replace with a valid seller ID
            });
        expect(response.status).to.equal(201);
        expect(response.body.success).to.be.true;
        testIds.perfume = response.body.data._id;
    });



    it('should get all perfumes', async function () {
        const response = await chai.request(app).get('/api/perfumes');
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });

    it('should get a single perfume by ID', async function () {
        const response = await chai.request(app).get(`/api/perfumes/${testIds.perfume}`);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });

    it('should update a perfume', async function () {
        const response = await chai.request(app)
            .put(`/api/perfumes/${testIds.perfume}`)
            .send({ price: 150 });
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });


    // Seller Routes


    it('should get all sellers', async function () {
        const response = await chai.request(app).get('/api/sellers');
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });

    it('should get a single seller by ID', async function () {
        const response = await chai.request(app).get(`/api/sellers/${testIds.seller}`);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });

    it('should update a seller', async function () {
        const response = await chai.request(app)
            .put(`/api/sellers/${testIds.seller}`)
            .send({ phone: '0987654321' });
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });

    // Customer Routes
    it('should create a new customer', async function () {
        const response = await chai.request(app)
            .post('/api/customers')
            .send({
                name: 'Jane',
                surname: 'Doe',
                phone: '9876543210',
                email: 'jane.doe@example.com',
            });
        expect(response.status).to.equal(201);
        expect(response.body.success).to.be.true;
        testIds.customer = response.body.data._id;
    });

    it('should get all customers', async function () {
        const response = await chai.request(app).get('/api/customers');
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });

    it('should get a single customer by ID', async function () {
        const response = await chai.request(app).get(`/api/customers/${testIds.customer}`);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });

    it('should update a customer', async function () {
        const response = await chai.request(app)
            .put(`/api/customers/${testIds.customer}`)
            .send({ phone: '1122334455' });
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });



    // Add similar tests for orders and notifications
    // Example for orders:
    it('should create a new order', async function () {
        const response = await chai.request(app)
            .post('/api/orders')
            .send({
                perfume: testIds.perfume, // Replace with valid perfume ID
                customer: testIds.customer, // Replace with valid customer ID
                quantity: 2,
            });
        expect(response.status).to.equal(201); // Ensure the order creation succeeds
        expect(response.body.success).to.be.true;
        testIds.order = response.body.data._id;
    });


    it('should delete an order', async function () {
        const response = await chai.request(app).delete(`/api/orders/${testIds.order}`);
        expect(response.status).to.equal(200); // Check for success
        expect(response.body.success).to.be.true;
    });

    // Add similar tests for notifications

    // DELETION

    it('should delete a perfume', async function () {
        const response = await chai.request(app).delete(`/api/perfumes/${testIds.perfume}`);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });

    it('should delete a seller', async function () {
        const response = await chai.request(app).delete(`/api/sellers/${testIds.seller}`);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });

    it('should delete a customer', async function () {
        const response = await chai.request(app).delete(`/api/customers/${testIds.customer}`);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.be.true;
    });


});
