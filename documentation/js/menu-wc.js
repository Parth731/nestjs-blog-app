'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-7c218748f22dea0ddb5f305cb0a74f6d82eb9a67281dc9f67604ae4431df89a78776f5e1f698cd8111c736c0d8b7449cea5a0f736ac588704b6f3871d9903dce"' : 'data-bs-target="#xs-controllers-links-module-AppModule-7c218748f22dea0ddb5f305cb0a74f6d82eb9a67281dc9f67604ae4431df89a78776f5e1f698cd8111c736c0d8b7449cea5a0f736ac588704b6f3871d9903dce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7c218748f22dea0ddb5f305cb0a74f6d82eb9a67281dc9f67604ae4431df89a78776f5e1f698cd8111c736c0d8b7449cea5a0f736ac588704b6f3871d9903dce"' :
                                            'id="xs-controllers-links-module-AppModule-7c218748f22dea0ddb5f305cb0a74f6d82eb9a67281dc9f67604ae4431df89a78776f5e1f698cd8111c736c0d8b7449cea5a0f736ac588704b6f3871d9903dce"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-7c218748f22dea0ddb5f305cb0a74f6d82eb9a67281dc9f67604ae4431df89a78776f5e1f698cd8111c736c0d8b7449cea5a0f736ac588704b6f3871d9903dce"' : 'data-bs-target="#xs-injectables-links-module-AppModule-7c218748f22dea0ddb5f305cb0a74f6d82eb9a67281dc9f67604ae4431df89a78776f5e1f698cd8111c736c0d8b7449cea5a0f736ac588704b6f3871d9903dce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7c218748f22dea0ddb5f305cb0a74f6d82eb9a67281dc9f67604ae4431df89a78776f5e1f698cd8111c736c0d8b7449cea5a0f736ac588704b6f3871d9903dce"' :
                                        'id="xs-injectables-links-module-AppModule-7c218748f22dea0ddb5f305cb0a74f6d82eb9a67281dc9f67604ae4431df89a78776f5e1f698cd8111c736c0d8b7449cea5a0f736ac588704b6f3871d9903dce"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-24b0d70fb9e61b33070c4df51426e18cc5f3c9bae9f2829e2a910c4f78324c8e8c989112d1a417c94c3ddcfa53d6523e8a20db05fe426fae9442c40195bc106b"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-24b0d70fb9e61b33070c4df51426e18cc5f3c9bae9f2829e2a910c4f78324c8e8c989112d1a417c94c3ddcfa53d6523e8a20db05fe426fae9442c40195bc106b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-24b0d70fb9e61b33070c4df51426e18cc5f3c9bae9f2829e2a910c4f78324c8e8c989112d1a417c94c3ddcfa53d6523e8a20db05fe426fae9442c40195bc106b"' :
                                            'id="xs-controllers-links-module-AuthModule-24b0d70fb9e61b33070c4df51426e18cc5f3c9bae9f2829e2a910c4f78324c8e8c989112d1a417c94c3ddcfa53d6523e8a20db05fe426fae9442c40195bc106b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-24b0d70fb9e61b33070c4df51426e18cc5f3c9bae9f2829e2a910c4f78324c8e8c989112d1a417c94c3ddcfa53d6523e8a20db05fe426fae9442c40195bc106b"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-24b0d70fb9e61b33070c4df51426e18cc5f3c9bae9f2829e2a910c4f78324c8e8c989112d1a417c94c3ddcfa53d6523e8a20db05fe426fae9442c40195bc106b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-24b0d70fb9e61b33070c4df51426e18cc5f3c9bae9f2829e2a910c4f78324c8e8c989112d1a417c94c3ddcfa53d6523e8a20db05fe426fae9442c40195bc106b"' :
                                        'id="xs-injectables-links-module-AuthModule-24b0d70fb9e61b33070c4df51426e18cc5f3c9bae9f2829e2a910c4f78324c8e8c989112d1a417c94c3ddcfa53d6523e8a20db05fe426fae9442c40195bc106b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-fd2112c2fa9e0abdcd3aac0ed86bcca400c9f1cba18f1d5e79dbe7fb4afe21f72b27288bc51a614772af3739ac2b4ba4f6ee6d29da4b904e54289839384dae77"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-fd2112c2fa9e0abdcd3aac0ed86bcca400c9f1cba18f1d5e79dbe7fb4afe21f72b27288bc51a614772af3739ac2b4ba4f6ee6d29da4b904e54289839384dae77"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-fd2112c2fa9e0abdcd3aac0ed86bcca400c9f1cba18f1d5e79dbe7fb4afe21f72b27288bc51a614772af3739ac2b4ba4f6ee6d29da4b904e54289839384dae77"' :
                                            'id="xs-controllers-links-module-PostsModule-fd2112c2fa9e0abdcd3aac0ed86bcca400c9f1cba18f1d5e79dbe7fb4afe21f72b27288bc51a614772af3739ac2b4ba4f6ee6d29da4b904e54289839384dae77"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-fd2112c2fa9e0abdcd3aac0ed86bcca400c9f1cba18f1d5e79dbe7fb4afe21f72b27288bc51a614772af3739ac2b4ba4f6ee6d29da4b904e54289839384dae77"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-fd2112c2fa9e0abdcd3aac0ed86bcca400c9f1cba18f1d5e79dbe7fb4afe21f72b27288bc51a614772af3739ac2b4ba4f6ee6d29da4b904e54289839384dae77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-fd2112c2fa9e0abdcd3aac0ed86bcca400c9f1cba18f1d5e79dbe7fb4afe21f72b27288bc51a614772af3739ac2b4ba4f6ee6d29da4b904e54289839384dae77"' :
                                        'id="xs-injectables-links-module-PostsModule-fd2112c2fa9e0abdcd3aac0ed86bcca400c9f1cba18f1d5e79dbe7fb4afe21f72b27288bc51a614772af3739ac2b4ba4f6ee6d29da4b904e54289839384dae77"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-cc263781a1050938f3e1066cc2e60584ed0bd363c4611b88c9ff5033787df4f8d2b57c2614e582debab4167366ea0d4b1fc68e374b54dd3f9e4dba131a596284"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-cc263781a1050938f3e1066cc2e60584ed0bd363c4611b88c9ff5033787df4f8d2b57c2614e582debab4167366ea0d4b1fc68e374b54dd3f9e4dba131a596284"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-cc263781a1050938f3e1066cc2e60584ed0bd363c4611b88c9ff5033787df4f8d2b57c2614e582debab4167366ea0d4b1fc68e374b54dd3f9e4dba131a596284"' :
                                            'id="xs-controllers-links-module-UsersModule-cc263781a1050938f3e1066cc2e60584ed0bd363c4611b88c9ff5033787df4f8d2b57c2614e582debab4167366ea0d4b1fc68e374b54dd3f9e4dba131a596284"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-cc263781a1050938f3e1066cc2e60584ed0bd363c4611b88c9ff5033787df4f8d2b57c2614e582debab4167366ea0d4b1fc68e374b54dd3f9e4dba131a596284"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-cc263781a1050938f3e1066cc2e60584ed0bd363c4611b88c9ff5033787df4f8d2b57c2614e582debab4167366ea0d4b1fc68e374b54dd3f9e4dba131a596284"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-cc263781a1050938f3e1066cc2e60584ed0bd363c4611b88c9ff5033787df4f8d2b57c2614e582debab4167366ea0d4b1fc68e374b54dd3f9e4dba131a596284"' :
                                        'id="xs-injectables-links-module-UsersModule-cc263781a1050938f3e1066cc2e60584ed0bd363c4611b88c9ff5033787df4f8d2b57c2614e582debab4167366ea0d4b1fc68e374b54dd3f9e4dba131a596284"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});