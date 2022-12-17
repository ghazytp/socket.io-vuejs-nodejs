<script>
import io from "socket.io-client"

let SERVER_URL = "http://localhost:3000"

export default {
    name: "ChatApp",
    data() {
        return {
            joined: false,
            currentUser: "",
            text: "",
            testing: [{ name: 'data testingss'}],
            messages: []
        }
    },
    methods: {
        join() {
            this.joined = true
            this.socket = io(SERVER_URL)

            // get data on messageReceived event and render it to all connected client
            this.socket.on('messageReceived', (data) => {
                console.log(data);
                this.messages = this.messages.concat(data)
            })

        },
        sendMessage() {
            const message = {
                id: new Date().getTime(),
                text: this.text,
                user: this.currentUser
            }
            
            // send message input by client to server on message event
            this.socket.emit('message', message)

            this.text = ""
        }
    }
}
</script>

<template>
    
    <div class="container  m-auto p-8">
        <h1 class="text-center font-bold text-3xl">Chat App</h1>

        <div v-if="!joined" class="flex flex-col w-56 mx-auto p-4 gap-4 border-2 mt-4">
            <input v-model="currentUser" type="text" id="username" class="px-3 py-2 border-2 text-center font-bold placeholder:text-center" placeholder="Username">
            <button @click="join()" class="bg-blue-200 hover:bg-blue-500 rounded-lg py-2"> Join Chat </button>
        </div>

        <div v-if="joined" class="p-4 border-2 bg-gray-200 mt-4 text-sm">
            <div class="h-[300px] border-2 bg-white border-black overflow-y-auto">
                <div v-for="(message, idx) in messages" :key="idx"  class="bg-blue-200 p-4 pt-2 rounded-xl m-2"> 
                    <b>{{message.user}}</b>
                    <p>{{message.text}}</p>
                    
                </div>
            </div>

            <div @keyup.enter="sendMessage" class="mx-auto flex pt-2 ">
                <textarea v-model="text" class="border-2 border-black w-full h-24 mx-auto p-2"></textarea>
            </div>
        </div>


    </div>
</template>