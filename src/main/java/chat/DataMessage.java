/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package chat;

/**
 *
 * @author User
 */
import org.json.simple.JSONAware;
import org.json.simple.JSONObject;

public class DataMessage implements JSONAware {
        private int id;
        private String author;
	private String text;
	
	public DataMessage() {
		author = "author";
		text = "";
	}
	public DataMessage(int id, String text,String author) {
                this.id = id;
		this.author = author;
		this.text = text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getAuthor() {
		return author;
	}
	public String getText() {
		return text;
	}
        public void setAuthor(String author) {
            this.author = author;
        }
        public int getId() {
            return id;
        }
	
	public static DataMessage parseDataMessage(JSONObject obj){
		DataMessage info = new DataMessage();
		if((String)obj.get("author") != null) {
		info.author = (String)obj.get("author");
		}
		info.text = (String)obj.get("text");
		return info;
	}	
	@Override
	public String toJSONString(){
		JSONObject obj = new JSONObject();
		obj.put("author", author);
		obj.put("message", text);
		return obj.toString();
	}
	@Override
	public String toString(){
		return author + " : " + text;
	}
	@Override
	public boolean equals(Object obj){
		return (((DataMessage)obj).getAuthor()==author);
	}
}
