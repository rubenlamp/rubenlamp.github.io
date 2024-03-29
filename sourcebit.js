const _ = require('lodash');

const isDev = process.env.NODE_ENV === 'development';
// //console.log('a pasé por sourcebit.js');

module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-filesystem'),
            options: {
                watch: isDev
            }
        },
        // flatten all frontmatter and markdown data
        ({ data }) => {
            const objects = data.objects.map(object => {
                ////console.log('b pasé por sourcebit.js');
                if (_.has(object, 'frontmatter')) {
                    return {
                        __metadata: object.__metadata,
                        ...object.frontmatter,
                        markdown_content: object.markdown || null
                    }
                }
                return object;
            });

            return {
                ...data,
                objects
            };
        },
        {
            module: require('sourcebit-target-next'),
            options: {
                liveUpdate: isDev,
                flattenAssetUrls: true,
                pages: [
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'home') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'contact') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'page') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'post') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'project') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'gallery') },
                    { path: '/{__metadata.urlPath}', predicate: _.matchesProperty('__metadata.modelName', 'blog') }
                ],
                commonProps: {
                    pages: { predicate: _.matchesProperty('__metadata.modelType', 'page') },
                    posts: { predicate: _.matchesProperty('__metadata.modelName', 'post') },
                    projects: { predicate: _.matchesProperty('__metadata.modelName', 'project') },
                    blog: { predicate: _.matchesProperty('__metadata.modelName', 'blog') },
                    data: { single: true, predicate: _.matchesProperty('__metadata.id', 'sourcebit-source-filesystem:data') }
                }
            }
        }
    ]
};
