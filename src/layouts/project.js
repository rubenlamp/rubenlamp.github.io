//console.log('a Pasé por layouts/project.js');
import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import Header from '../components/Header';
import HeaderAlt from '../components/HeaderAlt';
import Footer from '../components/Footer';
import { htmlToReact, markdownify } from '../utils';

export default class Project extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const header = _.get(config, 'header');
        const page = _.get(this.props, 'page');
        const hideHeader = _.get(page, 'hide_header');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const headerImage = _.get(page, 'content_img_path') ? _.get(page, 'content_img_path') : _.get(header, 'background_img');
        const date = _.get(page, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const markdownContent = _.get(page, 'markdown_content');
        ////console.log('b Pasé por layouts/project.js');
        return (
            <Layout page={page} config={config}>
                {hideHeader ? <HeaderAlt />
                    : <Header config={config} page={page} image={headerImage} />}
                <div id="content" className="site-content">
                    <main id="main" className="site-main inner">
                        <article className="project project-full">
                            <header className="project-header">
                                <h1 className="project-title">{title}</h1>
                                <div className="project-meta">
                                    Published on <time className="published" dateTime={dateTimeAttr}>{formattedDate}</time>
                                </div>
                            </header>
                            {subtitle && <div className="project-subtitle">{htmlToReact(subtitle)}</div>}
                            {markdownContent && <div className="project-content">{markdownify(markdownContent)}</div>}
                        </article>
                    </main>
                    <Footer config={config} />
                </div>
            </Layout>
        );
    }
}
