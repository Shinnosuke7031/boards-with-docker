FROM  nginx:latest

RUN apt-get update
RUN apt-get install -y cron
RUN apt-get install -y vim

# ADD crontab /var/spool/crontab/root
# RUN crontab /var/spool/crontab/root

# ADD run.sh /bin/run.sh
# CMD ["sh","/bin/run.sh"]