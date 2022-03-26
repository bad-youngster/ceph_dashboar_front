<template>
  <div class="mon_clock_skew">
    <p>检查主机时间,精确到纳秒</p>
    <p>date +"%T.%N"</p>
    <p>同步硬件时间</p>
    <p>以系统时间为准</p>
    <p>hwclock --systohc</p>
    <p>以硬件时间为准</p>
    <p>hwclock --hctosys</p>
    <p>同步时间服务器</p>
    <p>ntpdate "ntp 时间服务器IP"</p>

    <p></p>
  </div>
</template>