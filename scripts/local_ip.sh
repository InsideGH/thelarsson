#!/bin/bash

isOsx() {
    if [ "Darwin" = $(uname -s) ]; then
        echo "yes"
    else
        echo "no"
    fi
}

getHostIp() {
    if [ "yes" = $(isOsx) ]; then
        IPS=($(ifconfig | grep broadcast | awk '{print $2}'))
        echo "$IPS"
    else
        echo $(ip route get 1 | awk '{print $NF;exit}')
    fi
}

getHostIp
