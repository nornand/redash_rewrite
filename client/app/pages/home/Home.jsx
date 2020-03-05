import React, { useEffect, useState } from "react";
import { axios } from "@/services/axios";
import PropTypes from "prop-types";
import { includes, isEmpty } from "lodash";
import Alert from "antd/lib/alert";
import Icon from "antd/lib/icon";
import routeWithUserSession from "@/components/ApplicationArea/routeWithUserSession";
import EmptyState from "@/components/empty-state/EmptyState";
import DynamicComponent from "@/components/DynamicComponent";
import BeaconConsent from "@/components/BeaconConsent";
import recordEvent from "@/services/recordEvent";
import { messages } from "@/services/auth";
import notification from "@/services/notification";
import { Dashboard } from "@/services/dashboard";
import { Query } from "@/services/query";

function DeprecatedEmbedFeatureAlert() {
  return (
    <Alert
      className="m-b-15"
      type="warning"
      message={
        <>
          You have enabled <code>ALLOW_PARAMETERS_IN_EMBEDS</code>. This setting is now deprecated and should be turned
          off. Parameters in embeds are supported by default.{" "}
          <a
            href="https://discuss.redash.io/t/support-for-parameters-in-embedded-visualizations/3337"
            target="_blank"
            rel="noopener noreferrer">
            Read more
          </a>
          .
        </>
      }
    />
  );
}

function EmailNotVerifiedAlert() {
  const verifyEmail = () => {
    axios.post("verification_email").then(data => {
      notification.success(data.message);
    });
  };

  return (
    <Alert
      className="m-b-15"
      type="warning"
      message={
        <>
          We have sent an email with a confirmation link to your email address. Please follow the link to verify your
          email address.{" "}
          <a className="clickable" onClick={verifyEmail}>
            Resend email
          </a>
          .
        </>
      }
    />
  );
}

function FavoriteList({ title, resource, itemUrl, emptyState }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    resource
      .favorites()
      .then(({ results }) => setItems(results))
      .finally(() => setLoading(false));
  }, [resource]);

  return (
    <>
      <div className="d-flex align-items-center m-b-20">
        <p className="flex-fill f-500 c-black m-0">{title}</p>
        {loading && <Icon type="loading" />}
      </div>
      {!isEmpty(items) && (
        <div className="list-group">
          {items.map(item => (
            <a key={itemUrl(item)} className="list-group-item" href={itemUrl(item)}>
              <span className="btn-favourite m-r-5">
                <i className="fa fa-star" aria-hidden="true" />
              </span>
              {item.name}
              {item.is_draft && <span className="label label-default m-l-5">Unpublished</span>}
            </a>
          ))}
        </div>
      )}
      {isEmpty(items) && !loading && emptyState}
    </>
  );
}

FavoriteList.propTypes = {
  title: PropTypes.string.isRequired,
  resource: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  itemUrl: PropTypes.func.isRequired,
  emptyState: PropTypes.node,
};
FavoriteList.defaultProps = { emptyState: null };

function DashboardAndQueryFavoritesList() {
  return (
    <div className="tile">
      <div className="t-body tb-padding">
        <div className="row">
          <div className="col-sm-6">
            <FavoriteList
              title="收藏的仪表盘"
              resource={Dashboard}
              itemUrl={dashboard => `dashboard/${dashboard.slug}`}
              emptyState={
                <p>
                  <span className="btn-favourite m-r-5">
                    <i className="fa fa-star" aria-hidden="true" />
                  </span>
                  收藏的<a href="dashboards">仪表盘</a>会在这里展现
                </p>
              }
            />
          </div>
          <div className="col-sm-6">
            <FavoriteList
              title="收藏的查询"
              resource={Query}
              itemUrl={query => `queries/${query.id}`}
              emptyState={
                <p>
                  <span className="btn-favourite m-r-5">
                    <i className="fa fa-star" aria-hidden="true" />
                  </span>
                  收藏的<a href="queries">查询</a>会在这里展现
                </p>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  useEffect(() => {
    recordEvent("view", "page", "personal_homepage");
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        {includes(messages, "using-deprecated-embed-feature") && <DeprecatedEmbedFeatureAlert />}
        {includes(messages, "email-not-verified") && <EmailNotVerifiedAlert />}
        <EmptyState
          header="欢迎使用 Redash 👋"
          description="更好的连接、展示、分享你的数据"
          illustration="dashboard"
          helpLink="https://redash.io/help/user-guide/getting-started"
          showDashboardStep
          showInviteStep
          onboardingMode
        />
        <DynamicComponent name="HomeExtra" />
        <DashboardAndQueryFavoritesList />
        <BeaconConsent />
      </div>
    </div>
  );
}

export default routeWithUserSession({
  path: "/",
  title: "Redash",
  render: pageProps => <Home {...pageProps} />,
});
