import React from "react";

import routeWithUserSession from "@/components/ApplicationArea/routeWithUserSession";
import PageHeader from "@/components/PageHeader";
import Paginator from "@/components/Paginator";
import { QueryTagsControl } from "@/components/tags-control/TagsControl";
import SchedulePhrase from "@/components/queries/SchedulePhrase";

import { wrap as itemsList, ControllerType } from "@/components/items-list/ItemsList";
import { ResourceItemsSource } from "@/components/items-list/classes/ItemsSource";
import { UrlStateStorage } from "@/components/items-list/classes/StateStorage";

import LoadingState from "@/components/items-list/components/LoadingState";
import * as Sidebar from "@/components/items-list/components/Sidebar";
import ItemsTable, { Columns } from "@/components/items-list/components/ItemsTable";

import Layout from "@/components/layouts/ContentWithSidebar";

import { Query } from "@/services/query";
import { currentUser } from "@/services/auth";

import QueriesListEmptyState from "./QueriesListEmptyState";

import "./queries-list.css";

class QueriesList extends React.Component {
  static propTypes = {
    controller: ControllerType.isRequired,
  };

  sidebarMenu = [
    {
      key: "all",
      href: "queries",
      title: "所有的查询",
    },
    {
      key: "favorites",
      href: "queries/favorites",
      title: "收藏",
      icon: () => <Sidebar.MenuIcon icon="fa fa-star" />,
    },
    {
      key: "archive",
      href: "queries/archive",
      title: "已保存",
      icon: () => <Sidebar.MenuIcon icon="fa fa-archive" />,
    },
    {
      key: "my",
      href: "queries/my",
      title: "我的查询",
      icon: () => <Sidebar.ProfileImage user={currentUser} />,
      isAvailable: () => currentUser.hasPermission("create_query"),
    },
  ];

  listColumns = [
    Columns.favorites({ className: "p-r-0" }),
    Columns.custom.sortable(
      (text, item) => (
        <React.Fragment>
          <a className="table-main-title" href={"queries/" + item.id}>
            {item.name}
          </a>
          <QueryTagsControl
            className="d-block"
            tags={item.tags}
            isDraft={item.is_draft}
            isArchived={item.is_archived}
          />
        </React.Fragment>
      ),
      {
        title: "名称",
        field: "name",
        width: null,
      }
    ),
    Columns.avatar({ field: "user", className: "p-l-0 p-r-0" }, name => `由${name}创建`),
    Columns.dateTime.sortable({ title: "创建时间", field: "created_at" }),
    Columns.duration.sortable({ title: "运行时间", field: "runtime" }),
    Columns.dateTime.sortable({ title: "最近运行时间", field: "retrieved_at", orderByField: "executed_at" }),
    Columns.custom.sortable((text, item) => <SchedulePhrase schedule={item.schedule} isNew={item.isNew()} />, {
      title: "定时任务",
      field: "schedule",
    }),
  ];

  render() {
    const { controller } = this.props;
    return (
      <div className="page-queries-list">
        <div className="container">
          <PageHeader title={controller.params.pageTitle} />
          <Layout className="m-l-15 m-r-15">
            <Layout.Sidebar className="m-b-0">
              <Sidebar.SearchInput
                placeholder="搜索..."
                value={controller.searchTerm}
                onChange={controller.updateSearch}
              />
              <Sidebar.Menu items={this.sidebarMenu} selected={controller.params.currentPage} />
              <Sidebar.Tags url="api/queries/tags" onChange={controller.updateSelectedTags} />
              <Sidebar.PageSizeSelect
                className="m-b-10"
                options={controller.pageSizeOptions}
                value={controller.itemsPerPage}
                onChange={itemsPerPage => controller.updatePagination({ itemsPerPage })}
              />
            </Layout.Sidebar>
            <Layout.Content>
              {!controller.isLoaded && <LoadingState />}
              {controller.isLoaded && controller.isEmpty && (
                <QueriesListEmptyState
                  page={controller.params.currentPage}
                  searchTerm={controller.searchTerm}
                  selectedTags={controller.selectedTags}
                />
              )}
              {controller.isLoaded && !controller.isEmpty && (
                <div className="bg-white tiled table-responsive">
                  <ItemsTable
                    items={controller.pageItems}
                    columns={this.listColumns}
                    orderByField={controller.orderByField}
                    orderByReverse={controller.orderByReverse}
                    toggleSorting={controller.toggleSorting}
                  />
                  <Paginator
                    totalCount={controller.totalItemsCount}
                    itemsPerPage={controller.itemsPerPage}
                    page={controller.page}
                    onChange={page => controller.updatePagination({ page })}
                  />
                </div>
              )}
            </Layout.Content>
          </Layout>
        </div>
      </div>
    );
  }
}

const QueriesListPage = itemsList(
  QueriesList,
  () =>
    new ResourceItemsSource({
      getResource({ params: { currentPage } }) {
        return {
          all: Query.query.bind(Query),
          my: Query.myQueries.bind(Query),
          favorites: Query.favorites.bind(Query),
          archive: Query.archive.bind(Query),
        }[currentPage];
      },
      getItemProcessor() {
        return item => new Query(item);
      },
    }),
  () => new UrlStateStorage({ orderByField: "created_at", orderByReverse: true })
);

export default [
  routeWithUserSession({
    path: "/queries",
    title: "Queries",
    render: pageProps => <QueriesListPage {...pageProps} currentPage="all" />,
  }),
  routeWithUserSession({
    path: "/queries/favorites",
    title: "Favorite Queries",
    render: pageProps => <QueriesListPage {...pageProps} currentPage="favorites" />,
  }),
  routeWithUserSession({
    path: "/queries/archive",
    title: "Archived Queries",
    render: pageProps => <QueriesListPage {...pageProps} currentPage="archive" />,
  }),
  routeWithUserSession({
    path: "/queries/my",
    title: "My Queries",
    render: pageProps => <QueriesListPage {...pageProps} currentPage="my" />,
  }),
];
