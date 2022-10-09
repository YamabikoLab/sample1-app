FROM ruby:2.7.6

ARG TIME_ZONE
ARG APP_ROOT

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=${TIME_ZONE}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV APP_ROOT ${APP_ROOT}

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev \
                        mariadb-client \
                       --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# https://github.com/nodesource/distributions
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

RUN npm install -g yarn

COPY Gemfile ${APP_ROOT}/Gemfile
COPY Gemfile.lock ${APP_ROOT}/Gemfile.lock

RUN \
  echo 'gem: --no-document' >> ~/.gemrc && \
  cp ~/.gemrc /etc/gemrc && \
  chmod uog+r /etc/gemrc && \
  bundle config --global jobs 4 && \
  bundle install && \
  rm -rf ~/.gem

EXPOSE  5000