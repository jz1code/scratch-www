const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;

const MediaQuery = require('react-responsive').default;
const React = require('react');
const Formsy = require('formsy-react').default;
const classNames = require('classnames');

const GUI = require('scratch-gui').default;
const IntlGUI = injectIntl(GUI);


const decorateText = require('../../lib/decorate-text.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');

const thumbnailUrl = require('../../lib/user-thumbnail');

const projectShape = require('./projectshape.jsx').projectShape;
require('./mobile-preview.scss');

const frameless = require('../../lib/frameless');

// disable enter key submission on formsy input fields; otherwise formsy thinks
// we meant to trigger the "See inside" button. Instead, treat these keypresses
// as a blur, which will trigger a save.
const onKeyPress = e => {
    if (e.target.type === 'text' && e.which === 13 /* Enter */) {
        e.preventDefault();
        e.target.blur();
    }
};

const PreviewPresentation = ({
    addToStudioOpen,
    adminModalOpen,
    adminPanelOpen,
    assetHost,
    authorUsername,
    backpackHost,
    canAddToStudio,
    canDeleteComments,
    canRemix,
    canReport,
    canRestoreComments,
    canSave,
    canShare,
    canToggleComments,
    canUseBackpack,
    cloudHost,
    comments,
    editable,
    // extensions,
    // faved,
    // favoriteCount,
    // intl,
    // isAdmin,
    isFullScreen,
    // isLoggedIn,
    // isNewScratcher,
    // isProjectLoaded,
    // isRemixing,
    isScratcher,
    // isShared,
    // justRemixed,
    // justShared,
    // loveCount,
    // loved,
    // modInfo,
    // moreCommentsToLoad,
    // onAddComment,
    // onAddToStudioClicked,
    // onAddToStudioClosed,
    // onCloseAdminPanel,
    // onDeleteComment,
    // onFavoriteClicked,
    onGreenFlag,
    // onLoadMore,
    // onLoadMoreReplies,
    // onLoveClicked,
    // onOpenAdminPanel,
    onProjectLoaded,
    // onRemix,
    // onRemixing,
    // onReportClicked,
    // onReportClose,
    // onReportComment,
    // onReportSubmit,
    // onRestoreComment,
    // onSeeAllComments,
    // onSeeInside,
    onSetProjectThumbnailer,
    // onShare,
    // onSocialClicked,
    // onSocialClosed,
    // onToggleComments,
    // onToggleStudio,
    onUpdateProjectData,
    onUpdateProjectId,
    onUpdateProjectThumbnail,
    originalInfo,
    parentInfo,
    showCloudDataAlert,
    showUsernameBlockAlert,
    projectHost,
    projectId,
    projectInfo,
    projectStudios,
    remixes,
    replies,
    reportOpen,
    showAdminPanel,
    showModInfo,
    singleCommentId,
    socialOpen,
    userOwnsProject,
    visibilityInfo
}) => {
    const revisedDate = ((projectInfo.history && projectInfo.history.modified)) ? projectInfo.history.modified : '';
    const showInstructions = editable || projectInfo.instructions ||
        (!projectInfo.instructions && !projectInfo.description); // show if both are empty
    const showNotesAndCredits = editable || projectInfo.description ||
        (!projectInfo.instructions && !projectInfo.description); // show if both are empty

    return (
        <div className="preview">
            {projectInfo && projectInfo.author && projectInfo.author.id && (
                <React.Fragment>
                    {/* {banner} */}
                    <div className="inner">
                        <FlexRow className="preview-row column">
                            <FlexRow className="project-header">
                                <div className="title">
                                    我家{projectInfo.author.username}做的{projectInfo.title},快来鼓励一下吧;-)
                                </div>
                            </FlexRow>
                            <FlexRow >
                                <div className="project-description">
                                {decorateText(projectInfo.instructions, {
                                            usernames: true,
                                            hashtags: true,
                                            scratchLinks: true
                                        })}
                                </div>
                            </FlexRow>
                        </FlexRow>
                        <FlexRow className="preview-row">
                            <div
                                className={classNames(
                                    'mobile-guiPlayer',
                                    { fullscreen: isFullScreen }
                                )}
                            >
                                <IntlGUI
                                    isPlayerOnly
                                    assetHost={assetHost}
                                    backpackHost={backpackHost}
                                    backpackVisible={canUseBackpack}
                                    basePath="/"
                                    canRemix={canRemix}
                                    canSave={canSave}
                                    className="mobile-guiPlayer"
                                    cloudHost={cloudHost}
                                    hasCloudPermission={isScratcher}
                                    isFullScreen={isFullScreen}
                                    previewInfoVisible="false"
                                    projectHost={projectHost}
                                    projectId={projectId}
                                    onGreenFlag={onGreenFlag}
                                    onProjectLoaded={onProjectLoaded}
                                    // onRemixing={onRemixing}
                                    onSetProjectThumbnailer={onSetProjectThumbnailer}
                                    onUpdateProjectData={onUpdateProjectData}
                                    onUpdateProjectId={onUpdateProjectId}
                                    onUpdateProjectThumbnail={onUpdateProjectThumbnail}
                                />
                            </div>
                        </FlexRow>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

PreviewPresentation.propTypes = {
    addToStudioOpen: PropTypes.bool,
    adminModalOpen: PropTypes.bool,
    adminPanelOpen: PropTypes.bool,
    assetHost: PropTypes.string,
    authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    backpackHost: PropTypes.string,
    canAddToStudio: PropTypes.bool,
    canDeleteComments: PropTypes.bool,
    canRemix: PropTypes.bool,
    canReport: PropTypes.bool,
    canRestoreComments: PropTypes.bool,
    canSave: PropTypes.bool,
    canShare: PropTypes.bool,
    canToggleComments: PropTypes.bool,
    canUseBackpack: PropTypes.bool,
    cloudHost: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    editable: PropTypes.bool,
    extensions: PropTypes.arrayOf(PropTypes.object),
    faved: PropTypes.bool,
    favoriteCount: PropTypes.number,
    intl: intlShape,
    isAdmin: PropTypes.bool,
    isFullScreen: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isNewScratcher: PropTypes.bool,
    isProjectLoaded: PropTypes.bool,
    isRemixing: PropTypes.bool,
    isScratcher: PropTypes.bool,
    isShared: PropTypes.bool,
    justRemixed: PropTypes.bool,
    justShared: PropTypes.bool,
    loveCount: PropTypes.number,
    loved: PropTypes.bool,
    modInfo: PropTypes.shape({
        scriptCount: PropTypes.number,
        spriteCount: PropTypes.number
    }),
    moreCommentsToLoad: PropTypes.bool,
    onAddComment: PropTypes.func,
    onAddToStudioClicked: PropTypes.func,
    onAddToStudioClosed: PropTypes.func,
    onCloseAdminPanel: PropTypes.func,
    onDeleteComment: PropTypes.func,
    onFavoriteClicked: PropTypes.func,
    onGreenFlag: PropTypes.func,
    onLoadMore: PropTypes.func,
    onLoadMoreReplies: PropTypes.func,
    onLoveClicked: PropTypes.func,
    onOpenAdminPanel: PropTypes.func,
    onProjectLoaded: PropTypes.func,
    onRemix: PropTypes.func,
    onRemixing: PropTypes.func,
    onReportClicked: PropTypes.func.isRequired,
    onReportClose: PropTypes.func.isRequired,
    onReportComment: PropTypes.func.isRequired,
    onReportSubmit: PropTypes.func.isRequired,
    onRestoreComment: PropTypes.func,
    onSeeAllComments: PropTypes.func,
    onSeeInside: PropTypes.func,
    onSetProjectThumbnailer: PropTypes.func,
    onShare: PropTypes.func,
    onSocialClicked: PropTypes.func,
    onSocialClosed: PropTypes.func,
    onToggleComments: PropTypes.func,
    onToggleStudio: PropTypes.func,
    onUpdateProjectData: PropTypes.func,
    onUpdateProjectId: PropTypes.func,
    onUpdateProjectThumbnail: PropTypes.func,
    originalInfo: projectShape,
    parentInfo: projectShape,
    projectHost: PropTypes.string,
    projectId: PropTypes.string,
    projectInfo: projectShape,
    projectStudios: PropTypes.arrayOf(PropTypes.object),
    remixes: PropTypes.arrayOf(PropTypes.object),
    replies: PropTypes.objectOf(PropTypes.array),
    reportOpen: PropTypes.bool,
    showAdminPanel: PropTypes.bool,
    showCloudDataAlert: PropTypes.bool,
    showModInfo: PropTypes.bool,
    showUsernameBlockAlert: PropTypes.bool,
    singleCommentId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    socialOpen: PropTypes.bool,
    userOwnsProject: PropTypes.bool,
    visibilityInfo: PropTypes.shape({
        censored: PropTypes.bool,
        censoredByAdmin: PropTypes.bool,
        censoredByCommunity: PropTypes.bool,
        message: PropTypes.string,
        deleted: PropTypes.bool,
        reshareable: PropTypes.bool
    })
};

module.exports = injectIntl(PreviewPresentation);
