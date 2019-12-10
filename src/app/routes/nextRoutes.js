export default (App, Next) => {
    App.get('/', (req, res) => {
        try {
            return Next.render(req, res, '/');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/vip-parties', (req, res) => {
        try {
            return Next.render(req, res, '/vips');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/festivals', (req, res) => {
        try {
            return Next.render(req, res, '/festivals');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/festivals/:title', (req, res) => {
        try {
            return Next.render(req, res, '/event');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/events', (req, res) => {
        try {
            return Next.render(req, res, '/events');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/events/:title', (req, res) => {
        try {
            return Next.render(req, res, '/event');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/events-2/:title', (req, res) => {
        try {
            return Next.render(req, res, '/event');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/events-3/:title', (req, res) => {
        try {
            return Next.render(req, res, '/event');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/featured-events', (req, res) => {
        try {
            return Next.render(req, res, '/events');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/featured-events/:title', (req, res) => {
        try {
            req.renderData = {categorySlug: 'featured-events', slug: req.params.title}
            return Next.render(req, res, '/event');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/:category/:title', (req, res) => {
        try {
            req.renderData = {categorySlug: req.params.category, slug: req.params.title}
            return Next.render(req, res, '/article');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/fashion', (req, res) => {
        try {
            return Next.render(req, res, '/fashion');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/new', (req, res) => {
        try {
            return Next.render(req, res, '/new');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/music', (req, res) => {
        try {
            return Next.render(req, res, '/music');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/artist', (req, res) => {
        try {
            return Next.render(req, res, '/artist');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/lifestyle', (req, res) => {
        try {
            return Next.render(req, res, '/lifestyle');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/influencers', (req, res) => {
        try {
            return Next.render(req, res, '/influencers');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/outandabout', (req, res) => {
        try {
            return Next.render(req, res, '/outandabout');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/contact', (req, res) => {
        try {
            return Next.render(req, res, '/contact');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/privacy-and-policy', (req, res) => {
        try {
            return Next.render(req, res, '/privacyandpolicy');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
    App.get('/services', (req, res) => {
        try {
            return Next.render(req, res, '/services');
        } catch (error) {
            return Next.render(req, res, '/_error');
        }
    });
}